## paystack ![Build status](https://travis-ci.org/kehers/paystack.svg?branch=master)

A promisified version of the original paystack API wrapper for [Paystack](https://paystack.co/).

### Installation

```
npm install node-paystack
```

### Usage

```js
// Require the library
var paystack = require('paystack')('secret_key');
```

#### Making calls to the resources
The resource methods accepts an optional callback as the last argument. The callback returns two JSON objects - `error`, which will be null for successful calls, and `body`, the response from the API call. All resources return a promise and hence calls can be cascaded (A callback argument is not required when cascading calls).

```js
// paystack.{resource}.{method}
paystack.customer.list(function(error, body) {
  console.log(error);
  console.log(body);
});
```
OR
```js
paystack.customer.list()
.then(function(body) {
  console.log(body);
})
.catch(function(error) {
  console.log(error);
});
```

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
OR
```js
paystack.plan.create({
  name: 'API demo',
  amount: 10000,
  interval: 'monthly'
})
.then(function(body) {
  console.log(body);
})
.catch(function(error) {
  console.log(error);
});
```

For GET, you can pass the required ID as string and optional parameters as an optional object argument.

```js
paystack.plan.get(90, function(error, body) {
  console.log(error);
  console.log(body);
});
```
OR
```js
paystack.plan.get(90)
.then(function(body) {
  console.log(body);
})
.catch(function(error) {
  console.log(error);
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
OR
```js
paystack.transactions.list({
  perPage: 20
})
.then(function(body) {
  console.log(body);
})
.catch(function(error) {
  console.log(error);
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
- page
  - create
  - get
  - list
  - update
- subscription
  - create
  - disable
  - enable
  - get
  - list
- subaccount
  - create
  - get
  - list
  - listBanks
  - update

### Tests

To run tests, add your Paystack test secret key to `package.json`. (The test line should look something like this: `env KEY=sk_test_1a68ac96a0171fb72111a24295d8d31d41c28eed ./node_modules/.bin/mocha...`). Now run:

```
npm test
```

If you are contributing to the repo, kindly update the necessary test file in `/test` or add a new one and ensure all tests are passed before sending a PR.

### Todo

- Proper resource examples
- ES6 support

### Credits

[Kehers Paystack](https://github.com/kehers/paystack)
