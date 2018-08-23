var config = require('../../test-config.json');
var auth = require('../../auth-server.json');
var apps = require('../../devAppKeys.json');
var Promise = require('bluebird');
var utility= require('./Utilities');

var creds={};
global.token=null;
function getCreds(appName, productName){
    
        for(var app in apps){
            if(apps[app].name === appName){
              var credentials = apps[app].credentials;
            for(var credential in credentials){
                var products = credentials[credential].apiProducts;
              for(var product in products){
                if(products[product].apiproduct === productName){
                  creds.consumerKey = credentials[credential].consumerKey;
                  creds.consumerSecret = credentials[credential].consumerSecret;
                }
              }
            }
          }
        } 
    }
function getToken(){
    return new Promise(function(resolve,reject){
        var request = require('apickli');
        var tokens=utility.schemeSplit(auth.domain);
        request= new request.Apickli(tokens[0],
            tokens[1] + auth.basepath,
        './test/integration/features/fixtures/');
        request.setRequestHeader("Authorization",'Basic '+Buffer.from(creds.consumerKey+':'+creds.consumerSecret).toString('base64'));
        request.post('/accesstoken?grant_type=client_credentials', function(error,response){
            if(response){
                token=JSON.parse(response.body).access_token;
                resolve();
            }
        });
    });
}

module.exports = function() {

    this.registerHandler("BeforeFeatures", function(event, next) {
        getCreds(config['helloWorld'].app, config['helloWorld'].product);
        getToken().then(function(){
            return next();
        });
    });

	this.When(/^I make a hello request$/, {timeout: 60 * 1000}, function(callback) {
        this.apickli.setRequestHeader("Authorization",'Bearer '+token);
		this.apickli.get('/hello', callback);
    });

    this.Then(/^I should the greetings$/, function(callback) {
        var assertion= this.apickli.assertResponseBodyContainsExpression('Hello, Guest!');
        if(assertion.success)
            callback();
        else
            callback(JSON.stringify(assertion));
    });

    this.Then(/^I should see a resource not found response$/, function(callback) {
        var assertion= this.apickli.assertResponseCode("404");
        if(assertion.success)
            callback();
        else
            callback(JSON.stringify(assertion));
	});
}