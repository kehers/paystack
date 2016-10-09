var paystack = require('../index')(process.env.KEY)
  , mocha = require('mocha')
  , expect = require('chai').expect
  ;

describe("Paystack Plan", function() {

  var plan_id, plan_code;

  // New Plan
  it("should create a new plan", function(done) {
    paystack.plan.create({
        name: 'API Monthly',
        interval: 'monthly',
        amount: 100000
      }, function(error, body) {

      if (error)
        return done(error);

      expect(body).to.have.property('data');
      expect(body.data).to.have.property('id');
      expect(body.data).to.have.property('plan_code');

      plan_id = body.data.id;
      plan_code = body.data.plan_code;

      done();
    });
  });

  // Update Plan
  it("should update a plan", function(done) {
    paystack.plan.update(plan_id, {'name': 'Monthly Subscription for API Course'}, function(error, body) {

      if (error)
        return done(error);

      expect(body).to.be.an('object');

      done();
    });
  });

  // Fetch Plan
  it("should get details of a plan", function(done) {
    paystack.plan.get(plan_id, function(error, body) {

      if (error)
        return done(error);

      expect(body).to.have.property('data');
      expect(body.data).to.have.property('id');

      done();
    });
  });

  // List Plans
  it("should list plan", function(done) {
    paystack.plan.list(function(error, body) {

      if (error)
        return done(error);

      expect(body).to.have.property('data');
      expect(body.data).to.be.instanceof(Array);

      done();
    });
  });

});
