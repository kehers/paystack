var paystack = require('../index')(process.env.KEY)
  , mocha = require('mocha')
  , expect = require('chai').expect
  ;

describe("Paystack Pages", function() {

  var page_id;

  // New Page
  it("should create a new page", function(done) {
    paystack.page.create({
        name: 'API Monthly',
        amount: 100000
      })
      .then(function(body){
        expect(body).to.have.property('data');
        expect(body.data).to.have.property('id');
        page_id = body.data.id;
        done();
      })
      .catch(function(error){
        return done(error);
      });
  });

  // Update Page
  it("should update a page", function(done) {
    paystack.page.update(page_id, {'name': 'Monthly Subscription for API Course'})
    .then(function(body){
      expect(body).to.an('object');
      done();
    })
    .catch(function(error){
      return done(error);
    });
  });

  // Fetch Page
  it("should get details of a page", function(done) {
    paystack.page.get(page_id)
    .then(function(body){
      expect(body).to.have.property('data');
      expect(body.data).to.have.property('slug');
      done();
    })
    .catch(function(error){
      return done(error);
    });
  });

  // List Pages
  it("should list page", function(done) {
    paystack.page.list()
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
