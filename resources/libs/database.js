const mysql= require('mysql');

const db= mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "jose",
    password: "josejose",
    database: "login"
});

db.connect();

module.exports= db;