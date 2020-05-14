// TODO: Implement route that can add transaction to the database system

const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const config = require('./config.json');
const bcrypt = require('bcrypt');
const server_config = require("./server_config.json");

const app = express();

const PORT = server_config.port;

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
    });
})

app.get("/items", (req, res) => {
    const connection = mysql.createConnection(config);
    connection.connect(err => {
        if (err) throw err;
        const statement = "SELECT I.item_id, I.item_name, I.price, I.amount, S.supplier_name, C.class_name " +
            "FROM Item I, Supplier S, Class C WHERE S.supplier_id = I.supplier_id AND C.class_id = I.class_id";
        connection.query(statement, (err, results) => {
            if (err) throw err;
            res.json(results);
        })
    });
});

app.get("/bank/bank_name", (req, res) => {
    const connection = mysql.createConnection(config);
    connection.connect(err => {
        if (err) throw err;
        const statement = "SELECT * FROM BankName";
        connection.query(statement, (err, results) => {
            if (err) throw err;
            res.json(results);
        })
    })
})

app.get("/bank", (req, res) => {
    const connection = mysql.createConnection(config);
    const user_id = req.query.user_id;
    connection.connect(err => {
        if (err) throw err;
        const statement = `SELECT BA.customer_id, BA.bank_number, BA.user_id, BN.name 
                        FROM BankAccount BA, BankName BN 
                        WHERE BA.bank_id = BN.bank_id AND BA.user_id = ${user_id}`;
        connection.query(statement, (err, results) => {
            if (err) throw err;
            res.json(results);
        })
    })
})

app.post("/bank", (req, res) => {
    const customer_id = Date.now();
    const {bank_number, user_id, bank_id} = req.body;
    const connection = mysql.createConnection(config);
    connection.connect(err => {
        if (err) throw err;
        const statement = `INSERT INTO BankAccount(customer_id, bank_number, user_id, bank_id) 
                            VALUES('${customer_id}', '${bank_number}', '${user_id}', '${bank_id}')`
        connection.query(statement, (err, results) => {
            if (err) throw err;
            res.json({customer_id, user_id, bank_id, bank_number});
        })
    })
})

app.get("/bill", (req, res) => {
    const user_id = req.query.user_id;
    const connection = mysql.createConnection(config);
    connection.connect(err => {
        if (err) throw err;
        const statement = `SELECT DISTINCT BN.name, BA.bank_number, BD.bill_id, B.address, B.timestamp 
                            FROM BankName BN, BankAccount BA, BillDetail BD, Bill B 
                            WHERE BD.user_id = ${user_id} 
                            AND BA.customer_id = BD.customer_id 
                            AND BD.bill_id = B.bill_id 
                            AND BA.bank_id = BN.bank_id`
        connection.query(statement, (err, results) => {
            if (err) throw err;
            res.json(results);
        })
    })
})

app.get("/bill/:id", (req, res) => {
    const bill_id = req.params.id;
    const connection = mysql.createConnection(config);
    connection.connect(err => {
        if (err) throw err;
        const statement = `SELECT I.item_name, I.price, BD.amount 
                        FROM Item I, BillDetail BD 
                        WHERE I.item_id = BD.item_id 
                        AND BD.bill_id = ${bill_id}`;
        connection.query(statement, (err, results) => {
            if (err) throw err;
            res.json(results);
        })
    })
})

app.post("/bill", (req, res) => {
    const bill_id = Date.now();
    const {customer_id, discount, address, user_id, items} = req.body;
    const connection = mysql.createConnection({...config, multipleStatements: true});
    connection.connect(err => {
        if (err) throw err;
        let statement = `INSERT INTO Bill VALUES(${bill_id},${discount},'${address}','${bill_id}','${user_id}')`;
        connection.query(statement, (err, results) => {
            if (err) throw err;
        })
        let updateStatement = '';
        let values = [];
        for (let i=0;i<items.length;i++){
            updateStatement += `UPDATE Item SET amount = amount - ${items[i].buyAmount} WHERE item_id = ${items[i].id};`
            values.push([items[i].buyAmount, bill_id, items[i].id, customer_id, user_id]);
        }
        connection.query(updateStatement, (err, results) => {
            if (err) throw err;
        })
        connection.query("DELETE FROM Item WHERE amount = 0", (err, results) => {
            if (err) throw err;
        })
        statement = 'INSERT INTO BillDetail VALUES ?'
        connection.query(statement, [values], (err, results) => {
            if (err) throw err;
            res.json({bill_id, ...req.body})
        })
    })
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));