const router = require("express").Router();

// Importing necessary functions from the userController

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controller/userController");


// Setting up routes for retrieving and creating users
router.route("/").get(getUsers).post(createUser);
// Setting up routes for retrieving, updating, and deleting a specific user
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);
// Setting up routes for adding and removing friends for a user
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

// Exporting the configured router 
module.exports = router;