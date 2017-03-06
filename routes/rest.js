var express = require('express');
var router = express.Router();

var mysql= require("mysql");
var connection= mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "jose",
    password: "josejose",
    database: "login"
});

connection.connect();

router.post('/checkLogin', function(req, res, next) {
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

router.post('/register', function(req, res, next) {
    connection.query("SELECT * FROM usuarios WHERE login = ?",
        [req.body.login],
        function(error, results, fields) {
            if (error) {
                res
                    .status(400)
                    .json({ code: "ERROR_REGISTRARSE", msg: "Error al registrarse." });
            }
            if(results.length != 0) {
                res.json({ validUser: false });
            }
            else {
                connection.query("INSERT INTO usuarios(name, login, password) VALUES(?, ?, ?)",
                    [req.body.name, req.body.login, req.body.password],
                    function(error, results, fields) {
                        if (error) throw error;
                        res.json({ validUser: true });
                        console.log(results);
                    });
            }
        });
});

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
