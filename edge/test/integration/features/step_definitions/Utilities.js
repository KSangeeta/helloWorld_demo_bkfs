'use strict';
var schemeSplit=function(string){
    var stringTokens = string.split('://');
    return stringTokens;
}
module.exports.schemeSplit=schemeSplit;