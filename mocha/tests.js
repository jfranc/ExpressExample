const chai= require("chai");
const chaiHttp = require('chai-http');
const assert= chai.assert;

const checksSchemas= require('./checkschemas.js');
const errorMessages= require('../resources/helpers/errorMessages.js');

chai.use(chaiHttp);

describe("Primer test", function () {
    before(function() {

    });

    after(function() {

    });

    it("Test 1", function() {
        assert.equal(1, 1);
    });

    it("Test 2", function(finish) {
        setTimeout(function() {
            finish()
        }, 1000);
    });

    it("Test a servidor", function(finish) {
        chai.request("http://localhost:3000")
            .get("/")
            .set("token", "mitoken")
            .end(function(err, res) {
                assert.equal(res.statusCode, 200);
                finish();
            });
    });
});

describe("Test login", function () {
    before(function() {

    });

    after(function() {

    });

    it("Login correcto", function(callback) {
        chai.request("http://localhost:3000")
            .post("/rest/checkLogin")
            .send({"login": "pepe", "password" : "12345"})
            .end(function(err, res) {
                assert.equal(res.statusCode, 200);
                assert.equal(res.body.error, 0);
                assert.isTrue(checksSchemas("login", res.body));
                callback();
            });
    });

    it("Login incorrecto", function(callback) {
        chai.request("http://localhost:3000")
            .post("/rest/checkLogin")
            .send({"login": "pepe", "password" : "123455"})
            .end(function(err, res) {
                assert.equal(res.statusCode, 400);
                assert.equal(res.body.error, errorMessages.msgs.authUser.code);
                callback();
            });
    });

});
