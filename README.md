## paystack-node

A Nodejs API wrapper for [Paystack](https://paystack.co/).

### Installation

```
npm install paystack-node
```

### Usage

```js
// Require the library
var paystack = require('./index')('secret_key');

// Make a call to the resource/method
// paystack.{resource}.{method}
paystack.customer.list(function(error, body) {
  console.log(error);
  console.log(body);
});
```

The resource method accepts an optional callback as the last argument. The callback returns two JSON objects - `error`, which will be null for successful calls, and `body`, the response from the API call.

For resource methods that use POST or PUT, the JSON body can be passed as the first argument.

```js
paystack.plan.create({
  name: 'API demo',
  amount: 10000,
  interval: 'monthly'
},function(error, body) {
  console.log(error);
  console.log(body);
});
```

For GET, you can pass the required ID as string and optional parameters as an optioal object argument.

```js
paystack.plan.get(90, function(error, body) {
  console.log(error);
  console.log(body);
});
```

```js
paystack.transactions.list({
  perPage: 20
}, function(error, body) {
  console.log(error);
  console.log(body);
});
```

### Resources

- customer
  - create
  - get
  - list
  - update 
- transaction
  - initialize
  - charge
  - get
  - list
  - totals
  - verify
- plan
  - create
  - get
  - list
  - update

### Todo

- Proper resource examples
- Tests
- ES6 support
