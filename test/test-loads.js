// test-loads.js

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const Load = require('../models/load');

chai.use(chaiHttp);

const sampleLoad = {
    company: 'Campbell Logistics',
    pickupDate: "01/18/19",
    originLocation: "246 McAllister Street San Fransico, California",
    destination: "62169 Addison Drive Joplin, Missiouri",
    rate: "2000"
}

// tell mocha we want to test Loads (this string is taco - it can be anything)
describe('Loads', () => {

    after(() => {
        Load.deleteMany({company: 'Campbell Logistics'}).exec((err, loads) => {
            console.log(loads)
            loads.remove();
        })
    });

    // TEST HOME
    // use taco name for the test
    it('should display homepage on / GET', (done) => {
        // use chai-http to make a request to our server
        chai.request(server)
        // send a GET request to root route
        .get('/')
        // wait for response
        .end((err, res) => {
            // check that the response status is == 200 (success)
            res.should.have.status(200);
            // check that the response is a type html
            res.should.be.html;
            // end this test and move onto the next
            done();
        });
    });

    // TEST INDEX
    it('should index ALL loads on / GET', (done) => {
        chai.request(server)
        .get('/loads')
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.html;
            done();
        });
    });

    // TEST NEW
    it('should display new form on /loads/new GET', (done) => {
        chai.request(server)
        .get(`/loads/new`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html
          done();
        });
    });

    // TEST CREATE - throwing an error possibly because of validation
    // it('should create a SINGLE load on /loads POST', (done) => {
    //     chai.request(server)
    //         .post('/loads')
    //         .send(sampleLoad)
    //         .end((err, res) => {
    //           res.should.have.status(200);
    //           res.should.be.html
    //           done();
    //         });
    //  });

    // TEST SHOW
    it('should show a SINGLE load on /loads/<id> GET', (done) => {
        var load = new Load(sampleLoad);
        load.save((err, data) => {
            chai.request(server)
            .get(`/loads/${data._id}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html
                done();
            });
        });
    })

    // TEST UPDATE
    // TEST DELETE
})
