// TODO: add update api
const axios = require('axios');

const URL = 'http://localhost:3000/';
/**
 * get user from the bank data base.
 * @param bank_name {string}: the bank name. It should be one of the following value: 
 * 'american-express', 'visa', 'visa-retired', 'discover-card', 'master-card'
 * @return {Promise}
 */
// This function is only used for testing purposes. Uncomment the following to use.
// const getUser = (bank_name) => axios.get(URL + bank_name + '/user');

/**
 * get user by their bank number, and relevent bank name
 * @param bank_name {string} 	the name of the bank. 
 *                            	It should be one of the following value: 
 *                             'american-express', 'visa', 'visa-retired', 'discover-card', 'master-card'
 * 
 * @param bank_number {string} 	the bank account 
 * @return {Promise}			this promise is pending
 */
const getUserByBankNumber = (bank_name, bank_number) => axios.get(URL + bank_name + '/user/' + bank_number);

/**
 * make transaction and then update to the database
 * @param  {String}  bank_name      name of bank
 * @param  {String}  bank_number    bank account number
 * @param  {float}  transact_price  price that the user pays
 * @param  {Boolean} test           whether to update this to database or not (True: no, False: yes). 
 *                                  Default: True 
 */
const makeTransaction = (bank_name, bank_number, transact_price, test=true) => {
	getUserByBankNumber(bank_name, bank_number).then(res => {
		res.data.balance -= transact_price;
		axios.put(URL + bank_name + '/user/' + bank_number + '?test=' + String(test), res.data)
		.then(res => console.log('PUT successful'))
		.catch(err => {
			if(err.response.status === 400){
				console.log("User account cannot make this transaction");
				return;
			}
			else {
				throw err;
			}
		});
	}).catch(err => console.log("User not found"));
}

// Uncomment the following line to use getUser function in external module
// module.exports.getUser = getUser;
module.exports.getUserByBankNumber = getUserByBankNumber;
module.exports.makeTransaction = makeTransaction;