const moment= require("moment");
const jwt= require('../libs/jwt.js');

exports.encode = function(payload) {
    return jwt.encode({exp: moment.utc().add(24, "h").valueOf(), sub: payload});
};

exports.checkExp = function(token) {
    if(moment(moment.utc()).isBefore(token.exp)) {
        return token.sub;
    }

    return undefined;
};