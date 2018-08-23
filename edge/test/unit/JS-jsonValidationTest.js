var chai= require('chai');
var mockFactory=require('../unit/common/mockFactory.js');
var moduleLoader = require('./common/moduleLoader.js');
var sinon = require('sinon');

var js ='../../../apiproxy/resources/jsc/JS-jsonValidation.js';

describe('Testing Json validation file', function(){

    var expect= chai.expect;

    it("should trigger error", function(){

        let mock= mockFactory.getMock();
        moduleLoader.load(js, function(err) {
            expect(err).to.be.undefined;
            var result = mock.contextSetVariableMethod.args[0];
            expect(result[0],"triggerFault");
            expect(result[1],"true");
            result = mock.contextSetVariableMethod.args[1];
            expect(result[0],"flow.edge.error.message");
            expect(result[1]).to.be.a('string');
            expect(result[1]).to.contain('Invalid');

		});
    });
});
