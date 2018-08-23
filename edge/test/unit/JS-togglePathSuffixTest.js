var chai= require('chai');
var mockFactory=require('../unit/common/mockFactory');

describe('Testing toggle path suffix', function(){

    var expect= chai.expect;

    it("should toggle the path suffix of request", function(){

        let mock= mockFactory.getMock();
        require('../../apiproxy/resources/jsc/JS-togglePathSuffix');

        var result= mock.contextSetVariableMethod.args[0];
        expect(result[0]).to.equal('target.copy.pathsuffix');
        expect(result[1]).to.equal(false);

    });
});
