var fs = require('fs');
const path = require('path');
var cheerio = require('cheerio');

function getUserHomeDir() {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

function getHtmlStream() {
    var pathStuff = [getUserHomeDir(),
                     "code/somafm-playlist",
                     "spec/data/somafm.com",
                     "index.html"];

    var filepath = pathStuff.reduce((acc, curr) => {
        return path.join(acc, curr); });

    var htmltext=fs.readFileSync(filepath).toString();
    return htmltext;
}

function M3uParser () {
    this.parseFile = function() { } ;
    this.formats = [];
    for (var x=0; x < 7; x++) {
        this.formats.push('Woof');
    }
}

function Somafm () {
    this.channels = [];

    $ = cheerio.load(getHtmlStream());
    var tempArray = [];

    $("#stations ul li a").each(function(i, elem) {
        tempArray.push(elem.attribs.href);
    });

    for (var i=0; i < tempArray.length; i++)  {
        this.channels.push(tempArray[i]);
    }
}

function elementOf(elem, collection) {
    var index = collection.indexOf(elem);
    if ( index != -1 ) {
        return true;
    }
    return false;
}

function myfunction () {
    return 29;
}

exports.myfunction = myfunction;
exports.somafm = Somafm;
exports.getHtmlStream = getHtmlStream;
exports.elementOf = elementOf;
exports.m3uparser = M3uParser;
