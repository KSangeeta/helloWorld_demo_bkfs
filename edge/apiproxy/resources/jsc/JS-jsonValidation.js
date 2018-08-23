// This is a sample validaton file
var schema = {
    "title": "Person",
    "type": "object",
    "properties": {
        "firstName": {
            "type": "string"
        },
        "lastName": {
            "type": "string"
        },
        "age": {
            "description": "Age in years",
            "type": "integer",
            "minimum": 0
        }
    },
    "required": ["firstName", "lastName"]
};


function parsePayload(result){
    try{
        result.content = Json.parse(request.content);
    }catch(e){
        result.error = {"message" : "Invalid JSON - " + e.message};
        result.valid = false;
    }
}


function validatePayload(result,schema){
    result.valid = tv4.validate(result.content, schema);
    if(!result.valid){
        result.error = {"message": tv4.error.message, "dataPath": tv4.error.dataPath};
    }
}


var result = {valid: true,error:{},content:{}};

parsePayload(result);

if(result.valid)
    validatePayload(result,schema);
if(!result.valid){
    context.setVariable("triggerFault","true");
    context.setVariable("flow.edge.error.message",result.error.message);
}
    