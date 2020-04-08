var mysql = require('mysql');
var fs = require('fs');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "MinhLong94",
    database: "pdm"
});

// Export database into table.json file
con.connect();
con.query('SELECT * FROM pdm.newonlineretail ORDER BY ItemDes', function (err, results, fields) {
    if (err) throw err;

    fs.writeFile('table.json', JSON.stringify(results), function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
    con.end();
});











