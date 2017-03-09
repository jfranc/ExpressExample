const jwt= require('../libs/jwt');
const errorMessages= require('../helpers/errorMessages.js');
const resultJson= require('../helpers/resultJson.js');
const token= require('../libs/jwt.js');
const moment= require("moment");

function checkExpToken(token) {
    if(moment(moment.utc()).isBefore(token.exp)) {
        return token.sub;
    }

    return undefined;
}

// Devolver el error 400-403 si ha expirado el token

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.midlewareAuth= function(req, res, next) {
    const authorization= req.headers.authorization;
    const token= authorization.split(" ")[1];

    if(token == undefined) {
        resultJson.error(res, 400, errorMessages.msgs.authUser);
    }

    try {
        req.tokenDecode= checkExpToken(jwt.decode(token));
        if(req.tokenDecode) {
            next();
        }
        else {
            resultJson.error(res, 400, errorMessages.msgs.expiredUser);
        }
    } catch (e) {
        resultJson.error(res, 400, errorMessages.msgs.invalidTokenUser);
    }
};