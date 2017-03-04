var express = require('express');
var router = express.Router();

router.get('/registro', function(req, res, next) {
    res.render('registro');
});

module.exports = router;
