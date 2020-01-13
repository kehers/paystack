var paystack = require('../index')(process.env.KEY)
  , mocha = require('mocha')
  , expect = require('chai').expect
  ;


  describe("Paystack Transferrecipients", function() {

    var transfer_id, recipient_code;

    //Create Transfer Recipient
    it("should create a new transfer recipient", function(done) {
      paystack.transfer.create({
        type: 'nuban',
        name: 'Samuel Oluwatomi',
        account_number: '0172345944',
        bank_code: '058',
        currency: 'NGN',
        description: 'A transfer recipient'
      })
      .then(function(body){
        expect(body).to.have.property('status');
        expect(body).to.have.property('data');
        expect(body.data).to.have.property('id');
        expect(body.data).to.have.property('recipient_code');
  
        transfer_id = body.data.id;
        recipient_code = body.data.recipient_code;
        done();
      })
      .catch(function(error){
        return done(error);
      });
    });
  
    //List Transfer Recipient
    it("should list transfer recipients", function(done) {
      paystack.transfer.list_recipients()
      .then(function(body){
        expect(body).to.have.property('data');
        expect(body.data).to.be.instanceof(Array);
        done();
      })
      .catch(function(error){
        return done(error);
      });
    });

  //Update Transfer Recipient
  it("should update a transfer recipient", function(done) {
    paystack.transfer.update(transfer_id, {
      name: 'Samuel Jackson'
    })
    .then(function(body){
      expect(body).to.have.property('status');
      expect(body).to.have.property('message');
      done();
    })
    .catch(function(error){
      return done(error);
    });
  });
});

//Delete Transfer Recipient

  