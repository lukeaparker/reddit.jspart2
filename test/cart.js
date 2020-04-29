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
const Cart = require('../models/cart')
const server = require('../server')

chai.should()
chai.use(chaiHttp)

describe('Posts', function () {
  const agent = chai.request.agent(server)
  // Post that we'll use for testing purposes
  const newPost = {
    items: 'Apple',
  }
  it('Should create with valid attributes at POST /cart', function (done) {
    // Checks how many posts there are now
    Cart.estimatedDocumentCount()
      .then(function (initialDocCount) {
        chai
          .request(app)
          .post('/cart')
          // This line fakes a form post,
          // since we're not actually filling out a form
          .set('content-type', 'application/x-www-form-urlencoded')
          // Make a request to create another
          .send(newCart)
          .then(function (res) {
            Cart.estimatedDocumentCount()
              .then(function (newDocCount) {
                // Check that the database has one more post in it
                expect(res).to.have.status(200)
                // Check that the database has one more post in it
                expect(newDocCount).to.be.equal(initialDocCount + 1)
                done()
              })
              .catch(function (err) {
                done(err)
              })
          })
          .catch(function (err) {
            done(err)
          })
      })
      .catch(function (err) {
        done(err)
      })
    })
})

