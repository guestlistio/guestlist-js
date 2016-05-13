# guestlist-js

### Guestlist.io JavaScript SDK

Browser and Node.js compatible.

Full API documentation here: https://api.guestlist.io/doc

[![Build Status](https://travis-ci.org/guestlistio/guestlist-js.svg?branch=master)](https://travis-ci.org/guestlistio/guestlist-js)

### Install

```
npm install guestlist-js
```

### Usage

```js
var client = require('guestlist-js')()

client.setAccessToken(myAccessToken)

client.getEvents({
  limit: 10
}, function (err, events) {
  !err && console.log(err)
  console.log(events)
})
```

### Documentation

#### Users

- `authenticate(opts, cb)`
- `getUser(opts, cb)`
- `me(cb)`
- `registerUser(data, cb)`

#### Accounts

- `createAccount(data, cb)`
- `getAccount(accountId, cb)`
- `getAccounts(opts, cb)`
- `getMyAccounts(opts, cb)`
- `inviteEmail(opts, cb)`
- `modifyAccount(accountId, data, cb)`

#### Events

- `createEvent(data, cb)`
- `createChildEvent(parentEventId, data, cb)`
- `getEvent(eventId, cb)`
- `getEvents(opts, cb)`
- `modifyEvent(eventId, data, cb)`

#### Orders & RSVPs

- `getOrder(orderId, cb)`
- `getOrders(opts, cb)`
- `modifyOrder(orderId, data, cb)`
- `submitOrder(data, cb)`
- `submitPayment(orderId, data, cb)`
