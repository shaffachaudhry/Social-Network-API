const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// Setting the port 
const PORT = process.env.PORT || 3001;
const app = express();

// Configuring the Express application to handle URL encoded data and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Using the main router for handling all routes
app.use(routes);


//pnce the database connection is open, start the server on the specified port
db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });