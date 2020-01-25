const databaseCredentials = require('./database-credentials');
const mongoose = require('mongoose');

const dbRoute =
  `mongodb+srv://${databaseCredentials}@cluster0-lxxlf.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(dbRoute, { useNewUrlParser: true });

module.exports = mongoose.connection;