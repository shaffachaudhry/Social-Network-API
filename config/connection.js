const { connect, connection } = require('mongoose');

// Connect to the MongoDB database using the MONGODB_URI environment variable or defaulting to a local database connection if variable is not set
connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/Social-Network-API');

module.exports = connection;