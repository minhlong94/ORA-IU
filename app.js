const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const config = require('./config.json');
const bcrypt = require('bcrypt');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('<h1>Server is running</h1>');
})

app.get('/users', (req, res) => {
    const connection = mysql.createConnection(config);
    const username = req.query.username;
    connection.connect(err => {
        if (err) throw err;
        const statement = `SELECT username FROM Customer WHERE username='${username}'`;
        connection.query(statement, (err, results) => {
            if (err) throw err;
            res.json(results);
        });
    });
})

app.post('/users', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const connection = mysql.createConnection(config);
        connection.connect((err) => {
            if (err) throw err;
            const statement = `INSERT INTO Customer(user_id, username, password, first_name, last_name)
                        VALUES('${Date.now()}', '${req.body.username}', '${hashedPassword}',
                        '${req.body.first_name}', '${req.body.last_name}')`;
            connection.query(statement, (err, results) => {
                if (err) throw err;
                res.status(201).send();
            });
        });
    } catch (e) {
        res.status(500).send()
    }
});


console.log('Listening on port 5000...');
app.listen(5000);