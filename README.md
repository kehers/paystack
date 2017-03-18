## Paystack ![Build status](https://travis-ci.org/theslyone/node-paystack.svg?branch=master)

Nodejs API wrapper for [Paystack](https://paystack.co/).

### Installation

```
npm install paystack
```

### Usage

```js
// Require the library
var paystack = require('paystack')('secret_key');
```

#### Making calls to the resources
The resource methods accepts are promisified, but can receive optional callback as the last argument.

```js
// First Option
// paystack.{resource}.{method}
paystack.customer.list(function(error, body) {
  console.log(error);
  console.log(body);
});
```
```js
// Second Option
// paystack.{resource}
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
})
  .then(function(error, body) {
  	 console.log(error);
    console.log(body);
	});
```

For GET, you can pass the required ID as string and optional parameters as an optional object argument.

```js
paystack.plan.get(90)
	.then(function(error, body) {
		console.log(error);
		console.log(body);
	});
```

```js
paystack.transactions.list({perPage: 20})
	.then(function(error, body) {
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
- Miscellanous
  - list_banks
  - resolve_bin
  


### Contributing
- To ensure consistent code style, please follow the [editorconfig rules](http://obem.be/2015/06/01/a-quick-note-on-editorconfig.html) in .editorconfig

### Tests

To run tests, add your Paystack test secret key to `package.json`. (The test line should look something like this: `env KEY=sk_test_1a68ac96a0171fb72111a24295d8d31d41c28eed ./node_modules/.bin/mocha...`). Now run:

```
npm test
```

If you are contributing to the repo, kindly update the necessary test file in `/test` or add a new one and ensure all tests are passed before sending a PR.

### Todo

- Proper resource examples
- ES6 support
