var assert = require('assert');
var somaFmMaker = require('../main').somafm;
var M3uParserMaker = require('../main').m3uparser;
var getHtmlStream = require('../main').getHtmlStream;
var elementOf = require('../main').elementOf;

describe('Somafm', function() {
    // TODO: throw on bad URI?
    // a la Ruby's URI::InvalidURIError

    describe('#channels()', function() {
        var somafm = new somaFmMaker();
        it('should find groovesalad in the channel list', function() {
            assert(elementOf("/groovesalad/", somafm.channels) )
        });

        it('should find secretagent in the channel list', function() {
            assert(elementOf("/secretagent/", somafm.channels) )
        });

        it('should find seven groovesalad formats ', function() {
            // assert(elementOf("/secretagent/", somafm.channels) )
            var p = new M3uParserMaker();
            p.parseFile(
                'spec/data/somafm.com/groovesalad/directstreamlinks.html');

            assert.equal(p.formats.length, 7);
        });
    });



});
