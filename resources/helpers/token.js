const moment= require("moment");
const jwt= require('../libs/jwt.js');

exports.encode = function(payload) {
    const now= moment.utc();
    const exp= now.add(15, "s").valueOf();

    return jwt.encode({exp: exp, sub: payload});
};

exports.checkExp = function(token) {
    if(moment(moment.utc()).isBefore(token.exp)) {
        return token.sub;
    }

    return undefined;
};