var assert = require('assert');
describe('Array', function () {
  describe('#indexOf()', function () {
    // console.log(process.env.NODE_ENV)
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});
