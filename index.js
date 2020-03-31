const app = require('./route');
const bank_api = require('./bank_api')

const PORT = process.env.PORT || 3000;

app.listen(PORT);
console.log('Listening on port ' + PORT);