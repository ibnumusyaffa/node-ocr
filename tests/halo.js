const assert = require('assert');
const request = require('supertest');
const app = require('../server');
describe('Array', function () {
  console.log(process.env.NODE_ENV);
  describe('#indexOf()', function () {
    request(app).get('/user').expect('Content-Type', /json/);
  });
});
