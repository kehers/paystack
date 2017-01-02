var paystack = require('../index')(process.env.KEY)
  , mocha = require('mocha')
  , expect = require('chai').expect
  ;

describe("Paystack Subscriptions", function() {

  var subscription_id, subscription_code, token;

  /*
  // New Subscription
  // [This will fail as no authorization is added to customer yet
  // Hence next 3 tests will fail as well
  // Test ideas welcomed]
  it("should create a new subscription", function(done) {
    paystack.subscription.create({
        customer: 'kehers@gmail.com',
        plan: plan_code
      }, function(error, body) {

      if (error)
        return done(error);

      expect(body).to.have.property('data');
      expect(body.data).to.have.property('id');
      expect(body.data).to.have.property('subscription_code');
      expect(body.data).to.have.property('email_token');

      subscription_id = body.data.id;
      subscription_code = body.data.subscription_code;
      token = body.data.email_token;

      done();
    });
  });

  // Fetch Subscription
  it("should get details of a subscription", function(done) {
    paystack.subscription.get(subscription_id, function(error, body) {

      if (error)
        return done(error);

      expect(body).to.have.property('data');

      done();
    });
  });

  // Enable Subscription
  it("should get enable subscription", function(done) {
    paystack.subscription.enable({code: subscription_code, token: token}, function(error, body) {

      if (error)
        return done(error);

      done();
    });
  });

  // Disable Subscription
  it("should get disable subscription", function(done) {
    paystack.subscription.disable({code: subscription_code, token: token}, function(error, body) {

      if (error)
        return done(error);

      done();
    });
  });
  //*/

  // List Subscription
  it("should list subscription", function(done) {
    paystack.subscription.list()
    .then(function(body){
      expect(body).to.have.property('data');
      expect(body.data).to.be.instanceof(Array);
      done();
    })
    .catch(function(error){
      return done(error);
    });    
  });
});
