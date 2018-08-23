/* jshint node:true */
'use strict';

var apickli = require('apickli');
var config = require('../../test-config.json');
var uitility = require('./Utilities');

console.log('&helloWorld api: [' + config['helloWorld'].domain + ', ' + config['helloWorld'].basepath + ']');

module.exports = function() {
	// cleanup before every scenario
	this.Before(function(scenario, callback) {
		var tokens = uitility.schemeSplit(config['helloWorld'].domain);
		this.apickli = new apickli.Apickli(tokens[0],
										    tokens[1]+ config['helloWorld'].basepath,
										   './test/integration/features/fixtures/');
		callback();
	});
};
