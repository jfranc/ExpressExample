const express = require('express');
const router = express.Router();

const Ajv= require("ajv");
const ajv= new Ajv();
const mysql= require("mysql");
const schemas= require("./schemas.js");
const connection= mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "jose",
    password: "josejose",
    database: "login"
});

connection.connect();

function midlewareAuth(req, res, next ) {
    if(req.query.auth != "1") {
        res
            .status(400)
            .json({ code: "ERROR_AUTH", msg: "Error de autenticación." });
    }
    else {
        next();
    }
}

// Generator JSON Schemas http://jsonschema.net

function midlewareValidateSchema(schema) {
    return function(req, res, next) {
        if(ajv.validate(schemas[schema], req.body)) {
            next();
        }
        else {
            res.json({ code: "ERROR_VALIDATE", msg: "Error al validar." });
        }
    };
}

router.post('/checkLogin', midlewareValidateSchema("login"), function(req, res, next) {
    connection.query("SELECT * FROM usuarios WHERE login = ? AND password = ?",
        [req.body.login, req.body.password],
        function(error, results, fields) {
            if (error) {
                res
                    .status(400)
                    .json({ code: "ERROR_LOGIN", msg: "Error al autenticarse." });
            }
            else {
                if(results.length == 0) {
                    res.json({ validLogin: false });
                }
                else {
                    res.json({ validLogin: true });
                }
            }

        });
});

router.post('/register', midlewareValidateSchema("register"), function(req, res, next) {
    connection.query("SELECT * FROM usuarios WHERE login = ?",
        [req.body.login],
        function(error, results, fields) {
            if (error) {
                res
                    .status(400)
                    .json({ code: "ERROR_REGISTRARSE", msg: "Error al registrarse." });
            }
            if(results.length != 0) {
                res.json({ validUser: false, msg: "Duplicate user." });
            }
            else {
                connection.query("INSERT INTO usuarios(name, login, password) VALUES(?, ?, ?)",
                    [req.body.name, req.body.login, req.body.password],
                    function(error, results, fields) {
                        if (error) {
                            res
                                .status(400)
                                .json({ code: "ERROR_REGISTRARSE", msg: "Error al registrarse." });
                        }
                        res.json({ validUser: true });
                        console.log(results);
                    });
            }
        });
});

router.get('/listUsuarios', midlewareAuth, function(req, res, next) {
    connection.query('SELECT * FROM usuarios', function (error, results, fields) {
        if (error) {
            res
                .status(400)
                .json({ code: "ERROR_LISTUSUARIOS", msg: "Error al dar la lista de usuarios." });
        }
        res.json({ usersList: results });
    });
});

module.exports = router;
