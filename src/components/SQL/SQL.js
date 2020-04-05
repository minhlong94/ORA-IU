let mysql = require('mysql');

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "MinhLong94"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});