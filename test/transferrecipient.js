var paystack = require('../index')(process.env.KEY)
  , mocha = require('mocha')
  , expect = require('chai').expect
  ;

describe("Paystack Transfer Recipients", function() {
  // New Transfer Recipient
  it("should create a new transfer recipient", function(done) {
    paystack.transferrecipient.create({
        type: 'nuban',
        name: 'Adebanjo Afolasayo',
        description: 'Software Engineer',
        account_number: '0109900891',
        bank_code: '058',
        currency: 'NGN',
        metadata: {
          job: "Software Engineer"
        }
      })
      .then(function(body) {
        expect(body).to.have.property('data');
        expect(body.data).to.have.property('recipient_code');
        recipient_code = body.data.recipient_code;
        done();
      })
      .catch(function(error){
        return done(error);
      });
  });

  // List Transfer Recipients
  it("should list transfer recipients", function(done) {
    paystack.transferrecipient.list()
    .then(function(body) {
      expect(body).to.have.property('data');
      expect(body.data).to.be.instanceof(Array);
      done();
    })
    .catch(function(error){
      return done(error);
    });
  });
});
