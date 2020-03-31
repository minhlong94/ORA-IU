const express = require('express');
const fs = require('fs');
const app = express();

// load data
const american_express = require('./data/American Express.json');
const discover_card = require('./data/Discover Card.json');
const master_card = require('./data/MasterCard.json');
const visa_retired = require('./data/Visa Retired.json');
const visa = require('./data/VISA.json');

app.use(express.json());

// GET methods
app.get('/', (req, res) => {
	res.send('Please use the route /bank_name/user/')
});

app.get('/american-express/user/', (req, res) => {
	res.send(american_express);
});

app.get('/american-express/user/:bank_number', (req, res) => {
	let found_user = american_express.find(element => element.card_number === req.params.bank_number);
	if(!found_user){
		res.status(404).send('User not found');
		return;
	}
	res.send(found_user);
});

app.get('/discover-card/user/', (req, res) => {
	res.send(discover_card);
});

app.get('/discover-card/user/:bank_number', (req, res) => {
	let found_user = discover_card.find(element => element.card_number === req.params.bank_number);
	if(!found_user){
		res.status(404).send('User not found');
		return;
	}
	res.send(found_user);
});

app.get('/master-card/user/', (req, res) => {
	res.send(master_card);
});

app.get('/master-card/user/:bank_number', (req, res) => {
	let found_user = master_card.find(element => element.card_number === req.params.bank_number);
	if(!found_user){
		res.status(404).send('User not found');
		return;
	}
	res.send(found_user);
});

app.get('/visa-retired/user/', (req, res) => {
	res.send(visa_retired);
});

app.get('/visa-retired/user/:bank_number', (req, res) => {
	let found_user = visa_retired.find(element => element.card_number === req.params.bank_number);
	if(!found_user){
		res.status(404).send('User not found');
		return;
	}
	res.send(found_user);
});

app.get('/visa/user/', (req, res) => {
	res.send(visa);
});

app.get('/visa/user/:bank_number', (req, res) => {
	let found_user = visa.find(element => element.card_number === req.params.bank_number);
	if(!found_user){
		res.status(404).send('User not found');
		return;
	}
	res.send(found_user);
});

// PUT methods
app.put('/american-express/user/:bank_number', (req, res) => {
	let found_user = american_express.find(element => element.card_number === req.params.bank_number);
	if(!found_user){
		res.status(404).send('User not found');
		return;
	}

	if(req.body.balance < 0){
		res.status(400).send('Bad request');
		return;
	}

	if(found_user.balance === 0){
		res.status(403).send('User account has been frozen');
		return;
	}

	found_user.balance = req.body.balance;
	if(req.query.test === "false") {
		fs.writeFileSync('./data/American Express.json', JSON.stringify(american_express, null, 2), 'binary');
	}
	res.send(found_user);
});

module.exports = app;