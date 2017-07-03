var paystack = require('../index')(process.env.KEY)
  , mocha = require('mocha')
  , expect = require('chai').expect
  ;

describe("Paystack Settlements", function() {

  // Fetch Settlements
  it("should fetch settlements", function(done) {
    paystack.settlements.fetch()
      .then(function(body){
        expect(body).to.have.property('status');
        expect(body).to.have.property('message');
        
        done();
      }).catch(function(error){
        return done(error);
      });
  });
});
