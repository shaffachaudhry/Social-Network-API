const router = require("express").Router();

// Importing functions from the thoughtController

const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controller/thoughtController");

// Setting up routes for retrieving and creating thoughts
router.route("/").get(getThoughts).post(createThought);
// Setting up routes for retrieving, updating, and deleting a specific thought
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// Setting up routes for adding and deleting reactions to a thought
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);
router.route("/:thoughtId/reactions").post(addReaction);

module.exports = router;

