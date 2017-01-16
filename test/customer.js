var paystack = require('../index')(process.env.KEY)
  , mocha = require('mocha')
  , expect = require('chai').expect
  ;

describe("Paystack Customers", function() {

  var customer_id;

  // New Customer
  it("should create a new customer", function(done) {
    paystack.customer.create({
        first_name: 'Opeyemi',
        last_name: 'Obembe',
        email: 'kehers@gmail.com'
      })
      .then(function(body){
        expect(body).to.have.property('data');
        expect(body.data).to.have.property('id');
        customer_id = body.data.id;
        done();
      })
      .catch(function(error){
        return done(error);
      });
  });

  // To test callback & then chaining
  it("create new customer, parse in callback and enter then handler", function(done) {
    paystack.customer.create({
       first_name: 'Opeyemi',
       last_name: 'Obembe',
      email: 'kehers@gmail.com'
    }, function(error, body) {
    	// callback should parse response and return an object
    	return {'name': 'subomi'};
    }).then(function(body) {
     // callback is called, but then handler does not show its processing, but returns initial api response
    	expect(body).to.have.property('name')
    	done();
    }).catch(function(error) {
    	return done(error);
    });
  });

  // Update Customer
  it("should update a customer", function(done) {
    paystack.customer.update(customer_id, {last_name: 'Kehers'})
    .then(function(body){
      expect(body).to.have.property('data');
      expect(body.data).to.have.property('id');
      done();
    })
    .catch(function(error){
      return done(error);
    });
  });

  // Fetch Customer
  it("should get a customer's details", function(done) {
    paystack.customer.get(customer_id)
    .then(function(body){
      expect(body).to.have.property('data');
      expect(body.data).to.have.property('id');
      done();
    })
    .catch(function(error){
      return done(error);
    });
  });

  // List Customers
  it("should list customers", function(done) {
    paystack.customer.list()
    .then(function(body){
      expect(body).to.have.property('data');
      expect(body.data).to.be.instanceof(Array);
      done();
    })
    .catch(function(error){
      return done(error);
    });
  });

  //Whitelist Customer
  /*
  setRiskAction integration not available
  on test integration
  it("should whitelist customer", function(done) {
    paystack.customer.setRiskAction({
      "customer": customer_id,
      "risk_action": "allow"
    }, function(error, body) {

      if (error)
        return done(error);

      expect(body).to.have.property('data');
      expect(body.data).to.have.property('risk_action');

      done();
    });
  });
  */
});
