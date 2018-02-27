import _ from 'lodash'

const CROSS_ACCOUNTS_FIELD = 'crossAccounts'

Meteor.users.before.insert((userId, user) => {
  const crossAccounts = {
    token: Random.id(),
    list: [],
  }

  user[CROSS_ACCOUNTS_FIELD] = crossAccounts
})

Meteor.publish(null, function () {
  if (!this.userId)
    return null

  return Meteor.users.find({
    _id: this.userId,
  }, {
    fields: {
      [`${CROSS_ACCOUNTS_FIELD}.list`]: true,
    }
  })
})

Meteor.methods({
  'cross.accounts.checkpwd'({ login, password, url }) {
    check(login, String)
    check(password, String)
    check(url, String)

    const user = Meteor.users.findOne({ $or: [{ username: login }, { 'emails.address': login }] })

    if (!user)
      throw new Meteor.Error('user doesn\'t exist')

    if (!Accounts._checkPassword(user, password))
      throw new Meteor.Error('wrong password')

    return user
  },

  'cross.accounts.add'({ login, password, url }) {
    check(login, String)
    check(password, String)
    check(url, String)

    if (!this.userId)
      throw new Meteor.Error('require login to add cross account')

    if (!/$\//.test(url))
      url += '/'

    const remote = DDP.connect(url)

    const result = remote.call('cross.accounts.checkpwd', { login, password, url })

    remote.disconnect()

    const currentUser = Meteor.user()
    const requestFrom = Meteor.absoluteUrl()
    const requestToken = currentUser[CROSS_ACCOUNTS_FIELD]['token']

    const userAccount = { login, url, }

    const currentUserAccount = {
      login: _.get(currentUser, 'emails.0.address') || _.get(currentUser, 'username'),
      url: Meteor.absoluteUrl(),
    }

    const userCrossAccounts = _.get(result, `${CROSS_ACCOUNTS_FIELD}.list`, [])
    const currentUserCrossAccounts = _.get(currentUser, `${CROSS_ACCOUNTS_FIELD}.list`, [])

    const list = _.chain([])
      .concat(userAccount, currentUserAccount, userCrossAccounts, currentUserCrossAccounts)
      .unionWith(_.isEqual)
      .value()

    _.each(list, ({ login, url }) => {
      const remote = DDP.connect(url)
      remote.call('cross.accounts.update', list, { requestFrom, requestToken })
      remote.disconnect()
    })
  },

  'cross.accounts.update'(list, { requestFrom, requestToken }) {
    check(list, Array)

    const remote = DDP.connect(requestFrom)
    const isTokenVerified = remote.call('cross.accounts.checktoken', requestToken)

    if (!isTokenVerified)
      throw new Meteor.Error('unable to verify token')

    const logins = _.map(list, 'login')

    Meteor.users.update(
      { $or: [ { username: { $in: logins } }, { 'emails.address': { $in: logins } } ] },
      { $set: { [`${CROSS_ACCOUNTS_FIELD}.list`]: list } },
      { multi: true },
    )
  },

  'cross.accounts.checktoken'(token) {
    check(token, String)
    return Meteor.users.findOne({ [`${CROSS_ACCOUNTS_FIELD}.token`]: token }) ? true : false
  },
})
