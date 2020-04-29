const app = require('./../server')
const chai = require('chai')
const mocha = require('mocha')
const chaiHttp = require('chai-http')
const expect = chai.expect
const describe = mocha.describe
const it = mocha.it
const after = mocha.after

// Import the Post model from our models folder so we
// we can use it in our tests.
const server = require('../server')

chai.should()
chai.use(chaiHttp)


describe("site", function() {
  // Describe what you are testing
  it("Should have home page", function(done) {
    // Describe what should happen
    // In this case we test that the home page loads
    chai
      .request(app)
      .get("/")
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        res.status.should.be.equal(200);
        return done(); // Call done if the test completed successfully.
      });
  });
});
