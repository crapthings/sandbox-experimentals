Meteor.loginWithPassword('demo1', 'demo1')

Meteor.autorun(c => {
  if (!Meteor.user())
    return
  console.log(Meteor.user())

  Meteor.call('cross.accounts.add', {
    login: 'demo2@gmail.com',
    password: 'demo2',
    url: 'http://localhost:4000'
  }, (e, r) => {
    console.log(e, r)
  })
})
