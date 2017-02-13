var paystack = require('../index')(process.env.KEY)
  , mocha = require('mocha')
  , expect = require('chai').expect
  ;

describe("Paystack Miscellanous Functions", function() {

  // List Banks
  it("should list all supported banks", function(done) {
    paystack.misc.list_banks(function(error, body){
      if(error) 
      	return done(error);
    
      expect(body).to.have.property('data');
      expect(body.data[0]).to.have.property('name');
      done();
    })
  });
  
  // Resolve a Bin Card
  it("should resolve a bin card", function(done) {
    paystack.misc.resolve_bin(59983, function(error, body){
      if(error) 
        return done(error);    
        
      expect(body).to.have.property('data');
      expect(body.data).to.have.property('bin');
      done();
      })
  });

});
