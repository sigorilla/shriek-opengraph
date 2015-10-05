var shriekGraph = require('../index');
var chai = require('chai');
var mocha = require('mocha');
var should = chai.should();

describe('Url', function() {
  var testurl = 'http://ogp.me';
  var testmsg = {
    text: testurl
  };

  var result;

  beforeEach(function (done) {
    new Promise(function (resolve, reject) {
      shriekGraph([testmsg], function (err, data) {
        if (err) {
          reject(err);
        }
        resolve(data[0]);
      });
    })
      .then(function (data) {
        result = data;
        done();
      })
      .catch(function (err) {
        console.log('beforeEach err', err);
        done();
      });
  });

  afterEach(function (done) {
    result = undefined;
    done();
  });

  it('should have array meta', function (done) {
    result.should.have.property('meta');
    done();
  });

  it('should have property data in meta', function (done) {
    result.meta.should.have.property('data');
    done();
  });

  it('should have property text', function (done) {
    result.should.have.property('text');
    done();
  });
});
