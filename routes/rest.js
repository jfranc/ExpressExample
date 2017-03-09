const express = require('express');
const router = express.Router();

const resultJson= require('../resources/helpers/resultJson.js');
const errorMessages= require('../resources/helpers/errorMessages.js');
const db= require('../resources/libs/database.js');
const jwt= require('../resources/libs/jwt.js');
const checkSchemas= require('../resources/midleware/checkschemas.js');
const token= require('../resources/helpers/token.js');
const auth= require('../resources/midleware/auth.js');

router.post('/checkLogin', checkSchemas.midlewareValidateSchema("login"), function(req, res, next) {
    db.query("SELECT * FROM usuarios WHERE login = ? AND password = ?",
        [req.body.login, req.body.password],
        function(error, results, fields) {
            if (error) {
                resultJson.error(res, 400, errorMessages.msgs.authUser);
            }
            else {
                //console.log(errorMessages.lineOfCode());
                if(results.length == 0) {
                    resultJson.ok(res, { validLogin: false });
                }
                else {
                    resultJson.ok(res, { validLogin: true, token: token.encode(req.body.login) });
                }
            }

        });
});

router.post('/register', checkSchemas.midlewareValidateSchema("register"), function(req, res, next) {
    db.query("SELECT * FROM usuarios WHERE login = ?",
        [req.body.login],
        function(error, results, fields) {
            if (error) {
                resultJson.error(res, 400, errorMessages.msgs.registerUser);
            }
            if(results.length != 0) {
                resultJson.ok(res, { validUser: false }, "Duplicate user.");
            }
            else {
                db.query("INSERT INTO usuarios(name, login, password) VALUES(?, ?, ?)",
                    [req.body.name, req.body.login, req.body.password],
                    function(error, results, fields) {
                        if (error) {
                            resultJson.error(res, 400, errorMessages.msgs.authUser);
                        }
                        resultJson.ok(res, { validUser: true });
                    });
            }
        });
});

router.post('/listUsuarios', auth.midlewareAuth, function(req, res, next) {

    db.query('SELECT * FROM usuarios', function (error, results, fields) {
        if (error) {
            resultJson.error(res, 400, errorMessages.msgs.listUser);
        }

        resultJson.ok(res, { usersList: results });
    });
});

module.exports = router;
