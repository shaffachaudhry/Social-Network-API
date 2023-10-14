const router = require("express").Router();
// Importing the userRoutes and thoughtRoutes
const userRoutes = require("./userRoutes");
const thoughtRoutes = require("./thoughtRoutes");

// Setting up the routes for users and thoughts

router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

module.exports = router;