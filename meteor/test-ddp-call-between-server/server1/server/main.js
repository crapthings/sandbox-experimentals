Meteor.users.remove({})
const user = 'demo1'
if (!Meteor.users.findOne({ username: user }))
  Accounts.createUser({ username: user, password: user })

Accounts.addAutopublishFields({
  forLoggedInUser:['crossAccounts'],
})
