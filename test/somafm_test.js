const path = require('path');

var assert = require('assert');
var somaFmMaker = require('../main').somafm;
var findChannelWithName = require('../main').findChannelWithName;


describe('Somafm#channels', function() {
    // TODO: throw on bad URI?
    // a la Ruby's URI::InvalidURIError

    var somafm = new somaFmMaker();

    it('should find groovesalad in the channel list', function() {
        assert(findChannelWithName("/groovesalad/", somafm.channels) )
    });

    it('should find secretagent in the channel list', function() {
        assert(findChannelWithName("/secretagent/", somafm.channels) )
    });


    describe('formats()', function() {

        it('should find seven groovesalad formats ', function() {
            assert.equal(7, somafm.formatsForChannel('/groovesalad/').length)
        });

        it('should find six suburbsofgoa formats ', function() {
            assert.equal(6, somafm.formatsForChannel('/suburbsofgoa/').length)
        });
    });

});
