var xhr = require('xhr')
var xhr2 = require('xhr2')
var xtend = require('xtend')
var querystring = require('querystring')

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

Client.prototype.request = function (opts, cb) {
  var self = this
  var headers = xtend(self.headers)
  if (opts.accessToken) {
    headers['x-access-token'] = opts.accessToken
  }
  var qs = ''
  if (opts.query) {
    qs = '?' + querystring.stringify(opts.query)
  }
  xhr({
    method: opts.method,
    uri: self.baseUrl + opts.uri + qs,
    headers: headers,
    json: opts.body,
    xhr: new xhr2()
  }, function (err, resp, body) {
    if (err) {
      return cb(err)
    }
    var ok = [200, 201]
    if (ok.indexOf(resp.statusCode) === -1) {
      return cb(body.error || body)
    }
    cb(null, body)
  })
}

////// user endpoints //////

Client.prototype.authenticate = function (opts, cb) {
  this.request({
    method: 'post',
    uri: '/authenticate',
    body: opts
  }, cb)
}

Client.prototype.getUser = function (opts, cb) {
  this.request({
    method: 'get',
    uri: '/users' + opts.userId
  }, function (err, body) {
    if (err) return cb(err)
    cb(null, body.user)
  })
}

Client.prototype.me = function (cb) {
  this.request({
    method: 'get',
    uri: '/me'
  }, function (err, body) {
    if (err) return cb(err)
    cb(null, body.user)
  })
}

Client.prototype.registerUser = function (data, cb) {
  this.request({
    method: 'post',
    uri: '/users',
    body: data
  }, function (err, body) {
    if (err) return cb(err)
    cb(null, body.user)
  })
}

////// account endpoints //////

Client.prototype.createAccount = function (data, cb) {
  this.request({
    method: 'post',
    uri: '/accounts',
    body: data
  }, function (err, body) {
    if (err) return cb(err)
    cb(null, body.account)
  })
}

Client.prototype.getAccount = function (accountId, cb) {
  this.request({
    method: 'get',
    uri: '/accounts/' + accountId
  }, function (err, body) {
    if (err) return cb(err)
    cb(null, body.account)
  })
}

Client.prototype.getAccounts = function (opts, cb) {
  this.request({
    method: 'get',
    uri: '/accounts',
    query: opts
  }, function (err, body) {
    if (err) return cb(err)
    cb(null, body.accounts)
  })
}

Client.prototype.getMyAccounts = function (opts, cb) {
  this.request({
    method: 'get',
    uri: '/my/accounts',
    query: opts
  }, function (err, body) {
    if (err) return cb(err)
    cb(null, body.accounts)
  })
}

Client.prototype.inviteEmail = function (opts, cb) {
  this.request({
    method: 'post',
    uri: '/accounts/' + opts.accountId + '/invite',
    body: opts
  }, function (err, body) {
    if (err) return cb(err)
    cb(null, body)
  })
}

Client.prototype.modifyAccount = function (accountId, data, cb) {
  this.request({
    method: 'patch',
    uri: '/accounts/' + accountId,
    body: data
  }, function (err, body) {
    if (err) return cb(err)
    cb(null, body.account)
  })
}

////// event endpoints //////

Client.prototype.createEvent = function (data, cb) {
  this.request({
    method: 'post',
    uri: '/events',
    body: data
  }, function (err, body) {
    if (err) return cb(err)
    cb(null, body.event)
  })
}

Client.prototype.createChildEvent = function (parentEventId, data, cb) {
  this.request({
    method: 'post',
    uri: '/events/' + parentEventId + '/new-child',
    body: data
  }, function (err, body) {
    if (err) return cb(err)
    cb(null, body.event)
  })
}

Client.prototype.getEvent = function (eventId, cb) {
  this.request({
    method: 'get',
    uri: '/events/' + eventId
  }, function (err, body) {
    if (err) return cb(err)
    cb(null, body.event)
  })
}

Client.prototype.getEvents = function (opts, cb) {
  this.request({
    method: 'get',
    uri: '/events',
    query: opts
  }, function (err, body) {
    if (err) return cb(err)
    cb(null, body.events)
  })
}

Client.prototype.modifyEvent = function (eventId, data, cb) {
  this.request({
    method: 'patch',
    uri: '/events/' + eventId,
    body: data
  }, function (err, body) {
    if (err) return cb(err)
    cb(null, body.event)
  })
}

////// order endpoints //////

Client.prototype.getOrder = function (orderId, cb) {
  this.request({
    method: 'get',
    uri: '/orders/' + orderId
  }, function (err, body) {
    if (err) return cb(err)
    cb(null, body.order)
  })
}

Client.prototype.getOrders = function (opts, cb) {
  this.request({
    method: 'get',
    uri: '/orders',
    query: opts
  }, function (err, body) {
    if (err) return cb(err)
    cb(null, body.orders)
  })
}

Client.prototype.modifyOrder = function (orderId, data, cb) {
  this.request({
    method: 'patch',
    uri: '/orders/' + orderId,
    body: data
  }, function (err, body) {
    if (err) return cb(err)
    cb(null, body.order)
  })
}

Client.prototype.submitOrder = function (data, cb) {
  this.request({
    method: 'post',
    uri: '/orders',
    body: data
  }, function (err, body) {
    if (err) return cb(err)
    cb(null, body.order)
  })
}

Client.prototype.submitPayment = function (orderId, data, cb) {
  this.request({
    method: 'post',
    uri: '/orders/' + orderId + '/payment',
    body: data
  }, function (err, body) {
    if (err) return cb(err)
    cb(null, body.order)
  })
}
