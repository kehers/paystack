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
      }, function(error, body) {

      if (error)
        return done(error);

      expect(body).to.have.property('data');
      expect(body.data).to.have.property('id');

      customer_id = body.data.id;

      done();
    });
  });

  // Update Customer
  it("should update a customer", function(done) {
    paystack.customer.update(customer_id, {last_name: 'Kehers'}, function(error, body) {

      if (error)
        return done(error);

      expect(body).to.have.property('data');
      expect(body.data).to.have.property('id');

      done();
    });
  });

  // Fetch Customer
  it("should get a customer's details", function(done) {
    paystack.customer.get(customer_id, function(error, body) {

      if (error)
        return done(error);

      expect(body).to.have.property('data');
      expect(body.data).to.have.property('id');

      done();
    });
  });

  // List Customers
  it("should list customers", function(done) {
    paystack.customer.list(function(error, body) {

      if (error)
        return done(error);

      expect(body).to.have.property('data');
      expect(body.data).to.be.instanceof(Array);

      done();
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
