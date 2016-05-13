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

- `authenticate(opts, cb)`
- `getEvents(opts, cb)`
- `me(cb)`
- coming soon...
