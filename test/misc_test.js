var assert = require('assert');
var elementOf = require('../main').elementOf;
var myfunction = require('../main').myfunction;


describe('myfunction()', function() {
    it('should establish testing with a trivial function', function() {
        assert.equal(29, myfunction());
    });
});

describe('elementOf()', function() {
    var someArray = [3, 4, 5];
    it('should return true with 3 and array [3,4,5]', function() {
        assert(elementOf(3, someArray));
    });

    it('should return false with 27 and the [3,4,5]', function() {
        assert(false ===  elementOf(27, someArray));
    });
});
