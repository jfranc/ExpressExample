const jwt= require('jwt-simple');

const secret= "mysecretwebapp";

exports.encode= function(payload) {
    return jwt.encode(payload, secret);
};

exports.decode= function(token) {
    return jwt.decode(token, secret);
};