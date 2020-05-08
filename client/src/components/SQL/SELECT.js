// SELECT data from database

var mysql = require('mysql');
var fs = require('fs');

//Establish connection, replace password with your MySQL database's password
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "MinhLong94",
    database: "pdm"
});

// Export database as table.json file
con.connect();
con.query('SELECT * FROM pdm.newonlineretail ORDER BY ItemDes', function (err, results, fields) {
    if (err) throw err;
    fs.writeFile('table.json', JSON.stringify(results), function (err) {
        if (err) throw err;
        console.log('Query succeeded');
    });
    con.end();
});











