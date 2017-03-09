function getStack() {
    var error= new Error().stack;
    var indexOfLine= error.indexOf("at Query._callback (");

    //return error.substring(indexOfLine, error.indexOf(")", indexOfLine));

    return error;
};

exports.ok= function (res, result, description) {
    res.json({ error: 0, description: description ? description : "OK", result: result });
};

exports.error= function(res, status, error, result) {
    res
        .status(status)
        .json({ error: error.code, description: error.description, result: result, stack: getStack() });
};