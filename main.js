var fs = require('fs');
const path = require('path');
var cheerio = require('cheerio');

function getUserHomeDir() {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

function pathToSomaRoot() {
    var pathStuff = [getUserHomeDir(),
                     "code/somafm-playlist",
                     "spec/data/somafm.com"];

    return joinItUp(pathStuff);
}

function joinItUp(pathStuff) {
    var filepath = pathStuff.reduce((acc, curr) => {
        return path.join(acc, curr); });
    return filepath;
}

function getHtmlStream() {
    var filepath = path.join(pathToSomaRoot(), 'index.html')
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

function fullPathToDSLfilefor (channelName) {
    return joinItUp([pathToSomaRoot(), channelName, "directstreamlinks.html" ]);
}

function Somafm () {
    this.channels = [];

    $ = cheerio.load(getHtmlStream());

    // ugh
    var tempArray = [];

    $("#stations ul li a").each(function(i, elem) {
        tempArray.push(elem.attribs.href);
    });

    for (var i=0; i < tempArray.length; i++)  {
        // Create channel Object
        var channel = {};
        channel.name = tempArray[i];
        this.channels.push(channel);
    }

    function findChannelObject(channelName) {
        var co = null;
        for (var i=0; i < this.channels.length; i++){
            if ( channelName == this.channels )
                channel = this.channels[i];
        }
        return co;
    }

    this.getChannelContent = function(channelName){
        // load channel file content into Cheerio
        var fileName = fullPathToDSLfilefor(channelName);
        var htmltext=fs.readFileSync(fileName).toString();
        $2 = cheerio.load(htmltext);

        // find list of formats for channel
        var tempArray = [];

        var h2s = $2("#midcontent").html().split("<h2>")
        for (var i =0; i < h2s.length; i++) {
            var uris = h2s[i].split("<p class=\"url\">")
            if ((uris.length ) > 1) {
                tempArray.push(uris[2]);
            }
        }

        // find channel object
        var channel = findChannelWithName(channelName, this.channels)

        // give channel object an array for formats

        channel.formats = [];
        // write the list of formats into the channel object
        for (var i=0; i < tempArray.length; i++)  {
            var channelFormat = tempArray[i];
            channel.formats.push(channelFormat);
        }
    }

    this.formatsForChannel = function(channelName) {
        // find channel of interest
        this.getChannelContent(channelName);
        var channel = findChannelWithName(channelName, this.channels);
        // console.log("formatsForChannel: found channel with name  " + channel.name );
        return channel.formats
    };

}

function elementOf(elem, collection) {
    var index = collection.indexOf(elem);
    if ( index != -1 ) {
        return true;
    }
    return false;
}

function findChannelWithName(name, collection){
    for (var i = 0; i < collection.length; i++){
        if (collection[i].name == name ) {
            return collection[i];
        }
    }
    return null;
}


function myfunction () {
    return 29;
}

module.exports = {
    getUserHomeDir:getUserHomeDir,
    pathToSomaRoot:pathToSomaRoot,
    joinItUp:joinItUp,
    getHtmlStream:getHtmlStream,
    M3uParser:M3uParser,
    elementOf:elementOf,
    somafm:Somafm,
    findChannelWithName:findChannelWithName,
    myfunction:myfunction
}
