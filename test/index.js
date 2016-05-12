var test = require('tape')
global.XMLHttpRequest = require('xhr2')

var client = require('..')()

test('authenticate', function (t) {
  client.authenticate({
    email: 'satoshi@example.com',
    password: 'Pa$$w0rD'
  }, function (err, data) {
    t.error(err)
    t.ok(data.accessToken, 'token')
    client.setAccessToken(data.accessToken)
    t.end()
  })
})

test('me', function (t) {
  client.me(function (err, user) {
    t.error(err)
    t.ok(user.email, 'email')
    t.end()
  })
})