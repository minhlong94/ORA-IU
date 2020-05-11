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
        const statement = `SELECT user_id, username, first_name, last_name FROM Customer WHERE username='${username}'`;
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

app.post("/users/login", (req, res) => {
    const connection = mysql.createConnection(config);
    let state = {
        valid: true,
        user_id: '',
        username: '',
        first_name: '',
        last_name: '',
        errors: {
            username: '',
            password: ''
        }
    }
    const minPasswordLength = 8;
    connection.connect(err => {
        if (err) throw err;
        const statement = `SELECT * FROM Customer WHERE username='${req.body.username}'`;
        connection.query(statement, async (err, results) => {
            if (err) throw err;
            if (results.length === 0) {
                state.valid = false;
                state.errors.username = 'Username does not exist';
            }
            else if (req.body.password.length < minPasswordLength) {
                state.valid = false;
                state.errors.password = 'Password must contain at least 8 characters';
            }
            else {
                try {
                    if (!await bcrypt.compare(req.body.password, results[0].password)) {
                        state.valid = false;
                        state.errors.password = 'Incorrect password!';
                    }
                    else {
                        state.user_id = results[0].user_id;
                        state.username = results[0].username;
                        state.first_name = results[0].first_name;
                        state.last_name = results[0].last_name;
                    }
                }
                catch (e) {
                    res.status(500).send(e);
                }
            }
            res.json(state);
        });
    })
})

app.listen(5000, () => console.log('Listening on port 5000...'));