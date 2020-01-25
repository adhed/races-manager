const databaseCredentials = require('./database-credentials');
const mongoose = require('mongoose');

const dbRoute =
  `mongodb+srv://${databaseCredentials}@cluster0-lxxlf.mongodb.net/test?retryWrites=true&w=majority`;

console.log('Trying to connect to the database with credentials:', databaseCredentials);

mongoose
  .connect(dbRoute, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to the database.');
  })
  .catch((error) => {
    console.log('Connection to the database failed, error:', error);
  })

module.exports = mongoose.connection;