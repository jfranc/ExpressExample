var express = require('express');
var router = express.Router();

router.get('/login', function(req, res, next) {
    res.render('login');
});

router.get('/register', function(req, res, next) {
    res.render('register');
});

router.get('/list', function(req, res, next) {
    res.render('list');
});

router.get('/logout', function(req, res, next) {
    res.render('logout');
});

module.exports = router;
