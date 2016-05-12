var xhr = require('xhr')
var xhr2 = require('xhr2')
var xtend = require('xtend')

var Client = module.exports = function Client (opts) {
  if (!(this instanceof Client)) {
    return new Client(opts)
  }
  opts = opts || {}
  this.baseUrl = opts.baseUrl || 'https://api.guestlist.io'
  this.headers = {
    'Content-Type': 'application/json'
  }
  if (opts.accessToken) {
    this.headers['x-access-token'] = opts.accessToken
  }
}

if (typeof window !== 'undefined') {
  window.GuestlistIO = Client
}

////// utility methods //////

Client.prototype.setAccessToken = function (token) {
  this.headers['x-access-token'] = token
  if (!token) {
    delete this.headers['x-access-token']
  }
}

Client.prototype.send = function (opts, cb) {
  var self = this
  var headers = xtend(self.headers)
  if (opts.accessToken) {
    headers.accessToken = opts.accessToken
  }
  xhr({
    method: opts.method,
    uri: self.baseUrl + opts.uri,
    headers: headers,
    json: opts.body,
    xhr: new xhr2()
  }, function (err, resp, body) {
    if (err) {
      return cb(err)
    }
    var ok = [200, 201]
    if (ok.indexOf(resp.statusCode) === -1) {
      return cb(new Error(body.error.message))
    }
    cb(null, body)
  })
}

////// endpoint methods //////

Client.prototype.authenticate = function (opts, cb) {
  this.send({
    method: 'post',
    uri: '/authenticate',
    body: opts
  }, cb)
}

Client.prototype.registerUser = function (opts, cb) {
  this.send({
    method: 'post',
    uri: '/users',
    body: opts
  }, function (err, data) {
    if (err) return cb(err)
    cb(null, data.user)
  })
}

Client.prototype.me = function (opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }
  this.send({
    method: 'get',
    uri: '/me',
    accessToken: opts.accessToken
  }, function (err, data) {
    if (err) return cb(err)
    cb(null, data.user)
  })
}

Client.prototype.getUser = function (opts, cb) {
  this.send({
    method: 'get',
    uri: '/users' + opts.userId
  }, function (err, data) {
    if (err) return cb(err)
    cb(null, data.user)
  })
}
