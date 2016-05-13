# guestlist-js

### Guestlist.io JavaScript SDK

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

- `authenticate`
- `getEvents`
- `me`
- coming soon...
