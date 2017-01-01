var paystack = require('../index')(process.env.KEY)
  , mocha = require('mocha')
  , expect = require('chai').expect
  ;

describe("Paystack Miscellanous Functions", function() {

  // List Banks
  it("should list all supported banks", function(done) {
    paystack.misc.list_banks()
      .then(function(body){
        expect(body).to.have.property('data');
        expect(body.data[0]).to.have.property('name');
        done();
      })
      .catch(function(error){
        return done(error);
      });
  });
  
  // Resolve a Bin Card
  it("should resolve a bin card", function(done) {
    paystack.misc.resolve_bin(59983)
      .then(function(body){
        expect(body).to.have.property('data');
        expect(body.data).to.have.property('bin');
        done();
      })
      .catch(function(error){
        return done(error);
      });
  });

});
