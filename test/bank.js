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
      account_number: '0022728151',
      bank_code: '063'
    };
    paystack.bank.resolveAccountNumber(queryParams)
      .then(function(body){
        /** uncomment following 3 lines if above details are valid **/
        // expect(body).to.have.property('data');
        // expect(body.data).to.have.property('account_number');
        // expect(body.data).to.have.property('account_name');

        /** comment out following 2 lines if above details are valid **/
        expect(body).to.have.property('status');
        expect(body).to.have.property('message');
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

});
