const router = require('express').Router();
// Importing the apiRoutes
const apiRoutes = require('./api');

// Using the apiRoutes for requests to the '/api' endpoint
router.use('/api', apiRoutes);
//Setting up a catch-all route for handling 404 errors
router.use((req, res) => {
    res.status(404).send('Wrong route!');
  });


module.exports = router;