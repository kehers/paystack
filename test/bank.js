var paystack = require('../index')(process.env.KEY)
  , mocha = require('mocha')
  , expect = require('chai').expect
  ;

describe("Paystack Bank Related Functions", function() {

  // List Banks
  it("should list all supported banks", function(done) {
    paystack.bank.list()
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
  it("should resolve an account number", function(done) {
    var queryParams = {
      account_number: '2009687327',
      bank_code: '057'
    };
    paystack.bank.resolveAccountNumber(queryParams)
      .then(function(body){ 
        expect(body).to.have.property('data');
        expect(body.data).to.have.property('account_number');
        expect(body.data).to.have.property('account_name');
        done();
      })
      .catch(function(error){
        return done(error);
      });
  });

  // Resolve a Bin Card
  it("should resolve a card bin", function(done) {
    paystack.bank.resolveBin(539983)
      .then(function(body){
        expect(body).to.have.property('data');
        expect(body.data).to.have.property('bin');
        expect(body.data).to.have.property('card_type');
        done();
      })
      .catch(function(error){
        return done(error);
      });
  });

  // Resolve a Bvn 
  it("should resolve a bvn number", function(done) {
    paystack.bank.resolveBvn(21212917741)
      .then(function(body){
        expect(body.data).to.have.property('bvn');
        done();
      })
      .catch(function(error){
        return done(error);
      });
  });

});
