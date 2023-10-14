const { Thought, User } = require("../models");
// Importing models

module.exports = {
	async getThoughts(req, res) {
	// Function to retrieve all thoughts
		try {
			const thoughts = await Thought.find();
			res.json(thoughts);
		} catch (err) {
			res.status(500).json(err); 
			// Error handling in case of server issues
	}

	},

	async getSingleThought(req, res) {
	// Function to retrieve a single thought by its ID
		try {
			const thought = await Thought.findOne({_id: req.params.thoughtId,
			}).select('-__v');
			if (!thought) {
				res.status(404).json({ message: 'Thought with provided ID not found.' });
				// Sending a 404 error response if the thought is not found
			}
			res.json(thought);
		} catch (err) {
			res.status(500).json(err);
		}
    
    },

	async createThought(req, res) {
	// Function to create a new thought
		try {
			const { _id } = await Thought.create(req.body); // Creating a new thought
			const user = await User.findOneAndUpdate(
				{ _id: req.body.userId },
				{ $push: { thoughts: _id } },
				{ new: true }
			);// Updating the user's thoughts array with the newly created thought's ID
			if (!user) {
				res.status(404).json({ message: 'User with provided ID not found. ' });
			}
			res.json(user);
		} catch (err) {
			res.status(500).json(err);
		}

	},

    async updateThought(req, res) {
	// Function to update an existing thought
		try {
			const thought = await Thought.findOneAndUpdate(
				{ _id: req.params.thoughtId },
				{ $set: req.body },
				{ 
                runValidators: true, 
                new: true 
                }
			);// Updating the thought with the provided ID
			if (!thought) {
				return res .status(404).json({ message: 'Thought with provided ID not found ' });
			}
			res.json(thought);
		} catch (err) {res.status(500).json(err);
		}
	},

    async deleteThought(req, res) {
// Function to delete a thought
		try {
			const thought = await Thought.findOneAndDelete({_id: req.params.thoughtId }
            );
			if (!thought) {
				return res
					.status(404).json({ message: 'Thought with provided ID not found' });
			}
			const user = await User.findOneAndUpdate(
				{ thoughts: req.params.thoughtId },
				{ $pull: { thoughts: req.params.thoughtId } },
				{ new: true }
			);
			// Removing the thought ID from the user's thoughts array
			if (!user) {
				return res.status(404).json({
					message:  'User associated with this thought notfound',
				});
			}
			res.json(user);
		} catch (err) {
			res.status(500).json(err);
		}
	},

    async addReaction(req, res) {
	// Function to add a reaction to a thought
		try {
            
			const thought = await Thought.findOneAndUpdate(
				{ _id: req.params.thoughtId },
				{ $addToSet: { reactions: req.body } },
				{ runValidators: true, new: true }
			);
			// Adding a new reaction to the reactions array - thought
			if (!thought) {
				return res
					.status(404)
					.json({ message: 'Thought with provided ID not found' });
			}
			res.json(thought);
		} catch (err) {
			res.status(500).json(err);
		}
	},
	// Function to delete a reaction from a thought
    async deleteReaction(req, res) {
		try {
			const thought = await Thought.findOneAndUpdate(
				{ _id: req.params.thoughtId },
				{ $pull: { reactions: { reactionId: req.params.reactionId } } },
				{ runValidators: true, new: true }
			);
			// Removing a reaction from the reactions array
			if (!thought) {
				return res
					.status(404)
					.json({ message: 'Thought with provided ID not found' });
			}
			res.json(thought);
		} catch (err) {
			res.status(500).json(err);
		}
	},
};