var paystack = require('../index')(process.env.KEY)
  , mocha = require('mocha')
  , expect = require('chai').expect
  ;

describe("Paystack Transfer Recipients", function() {

  var reference;

  // Create Transaction
  it("should create a transfer recipient", function(done) {
    paystack.transfer_recipient.create({
        type: 'nuban',
        name: "Subomi Oluwalana",
        account_number: "2009687727",
        bank_code: "057",
        currency: "NGN"
    }, function(error, body) {
		
      if (error) {
      	reference = null;
      	return done(error);
      }
		reference = body.data.recipient_code;
		
      expect(body).to.have.property('data');
      expect(body.data).to.have.property('integration');
      done();
    });
  });
  
  it("should list all recipients", function(done) {
    paystack.transfer_recipient.list(function(error, body) {
      if(error) 
      	return done(error);
      
      expect(body).to.have.property('data');
      expect(body.data).to.be.an("array");
      done();
    });
  });
  
  it("should fetch a particular transfer recipients", function(done) {
  
    paystack.transfer_recipient.fetch(reference, function(error, body) {
      if(error) {
        return done(error);
      }
      expect(body).to.have.property('data');
      expect(reference).to.equal(body.data.recipient_code);
      done();
    });
    
    
  });

  it("should update a transfer recipient record", function(done) {
	 paystack.transfer_recipient.update(reference, {
	   type: 'nuban',
	   name: "Shubby",
	   account_number: "2009687327",
	   bank_code: "057",
	   currency: "NGN"
	 }, function(error, body) {  
	   done();
	 });
  });

});


