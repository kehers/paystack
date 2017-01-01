var paystack = require('../index')('sk_test_8fc4d1da50f1bab3ee8d41f2b210eed0fed602e0')//(process.env.KEY)
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
      }).then(function(body){
        expect(body).to.have.property('data');
        expect(body.data).to.have.property('id');
        expect(body.data).to.have.property('plan_code');

        plan_id = body.data.id;
        plan_code = body.data.plan_code;
        done();
      }).catch(function(error){
        return done(error);
      });
  });

  // Update Plan
  it("should update a plan", function(done) {
    paystack.plan.update(plan_id, {'name': 'Monthly Subscription for API Course'}).then(function(body){
      expect(body).to.be.an('object');
      done();
    }).catch(function(error){
      return done(error);
    });
  });

  // Fetch Plan
  it("should get details of a plan", function(done) {
    paystack.plan.get(plan_id).then(function(body){
      expect(body).to.have.property('data');
      expect(body.data).to.have.property('id');

      done();
    }).catch(function(error){
      return done(error);
    });
  });

  // List Plans
  it("should list plan", function(done) {
    paystack.plan.list().then(function(body){
      expect(body).to.have.property('data');
      expect(body.data).to.be.instanceof(Array);
      done();
    }).catch(function(error){
      return done(error);
    });
  });

});
