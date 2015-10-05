var shriekGraph = require('../index');
var chai = require('chai');
var mocha = require('mocha');
var should = chai.should();

describe('Messages', function() {
  var testurl = 'http://ya.ru';
  var testmsgs = [{
    text: '<p>' + testurl + '</p>'
  }];

  var result;

  before(function (done) {
    new Promise(function (resolve, reject) {
      shriekGraph(testmsgs, function (err, data) {
        if (err) {
          reject(err);
        }
        resolve(data);
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

  after(function (done) {
    result = undefined;
    done();
  });

  it('should be an array', function (done) {
    result.should.be.an('array');
    done();
  });

  it('should have property meta', function (done) {
    result[0].should.have.property('meta');
    done();
  });

  it('should have property ogTitle in meta.data', function (done) {
    result[0].meta.data.should.have.property('ogTitle');
    done();
  });

  it('should have property text', function (done) {
    result[0].should.have.property('text');
    done();
  });
});
