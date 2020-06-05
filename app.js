const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const config = require('./config.json');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const PORT = process.env.PORT;

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

app.post("/items", (req, res) => {
    const {id, name, price, amount, class_id, supplier_id} = req.body;
    const connection = mysql.createConnection(config);
    connection.connect(err => {
        if (err) throw err;
        const statement = `INSERT INTO Item(item_id, item_name, price, amount, class_id, supplier_id)  
                            VALUES('${id}','${name}','${price}','${amount}','${class_id}','${supplier_id}')`
        connection.query(statement, (err, results) => {
            if (err) throw err;
            res.json(req.body);
        })
    })
})

app.put("/items", (req, res) => {
    const connection = mysql.createConnection(config);
    const {id, name, price, amount, class_id, supplier_id} = req.body;
    connection.connect(err => {
        if (err) res.status(500).send();
        const statement = `UPDATE Item SET item_name='${name}',
                               price='${price}',
                               amount='${amount}',
                               class_id='${class_id}',
                               supplier_id='${supplier_id}'
                           WHERE item_id='${id}'`;
        connection.query(statement, (err, results) => {
            if (err) res.status(500).send(err);
            res.json(req.body);
        })
    })
})

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
                        FROM BankAccount BA JOIN BankName BN ON BA.bank_id = BN.bank_id 
                        WHERE BA.user_id = ${user_id}`;
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
        const statement = `SELECT
                                C.user_id, B.bill_id, B.customer_id,
                                BA.bank_number,
                                BN.name,
                                B.address, B.discount, B.timestamp,
                                I.item_id, BD.amount, I.price, I.item_name
                            FROM Bill B JOIN BillDetail BD ON B.bill_id = BD.bill_id
                                        JOIN BankAccount BA on B.customer_id = BA.customer_id and B.user_id = BA.user_id
                                        JOIN BankName BN on BA.bank_id = BN.bank_id
                                        JOIN Customer C on BA.user_id = C.user_id
                                        JOIN Item I on BD.item_id = I.item_id
                            WHERE B.user_id = '${user_id}'`
        connection.query(statement, (err, results) => {
            if (err) throw err;
            let resObj = {user_id, bills: []}
            for (const bill of results) {
                if (!resObj.bills.find(val => val.bill_id === bill.bill_id))
                    resObj.bills.push({
                        bill_id: bill.bill_id,
                        customer_id: bill.customer_id,
                        bank_number: bill.bank_number,
                        bank_name: bill.name,
                        address: bill.address,
                        discount: bill.discount,
                        timestamp: bill.timestamp,
                        items: [
                            {
                                item_id: bill.item_id,
                                item_name: bill.item_name,
                                price: bill.price,
                                buyAmount: bill.amount
                            }
                        ]
                    })
                else {
                    let idx = resObj.bills.findIndex(val => val.bill_id === bill.bill_id);
                    resObj.bills[idx].items.push({
                        item_id: bill.item_id,
                        item_name: bill.item_name,
                        price: bill.price,
                        buyAmount: bill.amount
                    })
                }
            }
            res.json(resObj);
        })
    })
})

app.get("/bill/:id", (req, res) => {
    const bill_id = req.params.id;
    const connection = mysql.createConnection(config);
    connection.connect(err => {
        if (err) throw err;
        const statement = `SELECT I.item_name, I.price, BD.amount 
                        FROM Item I JOIN BillDetail BD ON I.item_id = BD.item_id
                        WHERE BD.bill_id = ${bill_id}`;
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
        let statement = `INSERT INTO Bill VALUES(${bill_id},${discount},'${address}','${bill_id}', ${customer_id},'${user_id}')`;
        connection.query(statement, (err, results) => {
            if (err) throw err;
        })
        let updateStatement = '';
        let values = [];
        for (let i=0;i<items.length;i++){
            updateStatement += `UPDATE Item SET amount = amount - ${items[i].buyAmount} WHERE item_id = ${items[i].id};`
            values.push([items[i].buyAmount, bill_id, items[i].id]);
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
        })
    })
})

app.post("/query", (req, res) => {
    const connection = mysql.createConnection(config);
    const statement = req.body.statement;
    connection.connect(err => {
        if (err) throw err;
        try {
            connection.query(statement, (err, results) => {
                if (err) throw err;
                res.json(results);
            });
        } catch (e) {
            res.status(500).send();
        }
    });
});

app.post('/supplier', (req, res) => {
    const {id, name} = req.body;
    const connection = mysql.createConnection(config);
    connection.connect(err => {
        if (err) throw err;
        const statement = `INSERT INTO Supplier(supplier_id, supplier_name) VALUES('${id}', '${name}')`;
        connection.query(statement, (err, results) => {
            if (err) throw err;
            res.json(req.body);
        })
    })
})

app.get('/supplier', (req, res) => {
    const connect = mysql.createConnection(config);
    connect.connect(err => {
        if (err) throw err;
        const statement  = "SELECT * FROM Supplier";
        connect.query(statement, (err, results) => {
            if (err) throw err;
            res.json(results);
        })
    })
})

app.post('/class', (req, res) => {
    const {id, name} = req.body;
    const connection = mysql.createConnection(config);
    connection.connect(err => {
        if (err) throw err;
        const statement = `INSERT INTO Class(class_id, class_name) VALUES('${id}', '${name}')`;
        connection.query(statement, (err, results) => {
            if (err) throw err;
            res.json(req.body);
        })
    })
})

app.get('/class', (req, res) => {
    const connection = mysql.createConnection(config);
    connection.connect(err => {
        if (err) throw err;
        const statement = "SELECT * FROM Class";
        connection.query(statement, (err, results) => {
            if (err) throw err;
            res.json(results);
        })
    })
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));