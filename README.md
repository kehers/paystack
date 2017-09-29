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
// First Option (with callback)
// paystack.{resource}.{method}(callback)
paystack.customer.list(function(error, body) {
  console.log(error);
  console.log(body);
});
```
```js
// Second Option (as promise)
// paystack.{resource}.{method}.then().catch()
paystack.customer.list()
	.then(function(body) {
  		console.log(body);
	})
	.catch(function(error) {
		console.log(error);
	});
```



For GET endpoints with url path parameters (e.g. https://api.paystack.co/plan/{id_or_plan_code}), pass path parameter as string or number
Separate path parameter values by comma if more than 1 path parameter and place them in order as they appear in the url path.

```js
paystack.plan.get(90)
  .then(function(error, body) {
    console.log(error);
    console.log(body);
  });
```

For GET endpoints with query string parameters (e.g. https://api.paystack.co/bank/resolve?account_number=0022728151&bank_code=063), pass paramaters as object.

```js
paystack.bank.resolve_account_number({account_number: '0022778151', bank_code: '063'})
  .then(function(error, body) {
    console.log(error);
    console.log(body);
  });
```

For POST or PUT endpoints, the JSON body should be passed as the first argument.

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

For POST or PUT endpoints, if the endpoint also has path parameters (e.g. https://api.paystack.co/customer/{id_or_customer_code}), pass the path parameters as explained above, before passing the JSON body object.

```js
var customer_id = 100;
paystack.customer.update(customer_id, {last_name: 'Kehers'})
  .then(function(error, body) {
     console.log(error);
    console.log(body);
  });
```

### Resources and Methods

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
- bank
  - list
  - resolveAccountNumber
  - resolveBin
- Miscellanous
  - list_banks
  - resolve_bin

To use any endpoint, call 
```js
//using callback function
paystack.{resource}.{method}(function(err, body){
  console.log(error);
  console.log(body);
});

//or as promise
paystack.{resource}.{method}
  .then(function(body) {
      console.log(body);
  })
  .catch(function(error) {
    console.log(error);
  });
```

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
