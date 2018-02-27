Package.describe({
  name: 'crapthings:cross-accounts',
  summary: 'link your accounts from multiple servers',
  version: '0.0.1',
  git: 'https://github.com/crapthings/meteor-cross-accounts'
})

Npm.depends({
  'lodash': '4.17.4',
})

Package.on_use(function (api) {
  api.use([
    'ecmascript',
    'check',
    'random',
    'accounts-password',
  ])

  api.use([
    'matb33:collection-hooks',
  ])

  api.add_files('client.js', 'client')
  api.add_files('server.js', 'server')
})
