var express = require('express');
var router = express.Router();

router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Login' });
});

router.get('/register', function(req, res, next) {
    res.render('register', { title: 'Register' });
});

router.get('/list', function(req, res, next) {
    res.render('list' , { title: 'List' });
});

module.exports = router;
