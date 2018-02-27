Meteor.users.remove({})
const email = 'demo2@gmail.com'
if (!Accounts.findUserByEmail(email))
  Accounts.createUser({ email, password: 'demo2' })
