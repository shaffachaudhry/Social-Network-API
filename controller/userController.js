const { User, Thought } = require('../models');
// Importing models

module.exports = {
	async getUsers(req, res) {
		// Function to get all users
		try {
			const users = await User.find()
			.select('-__v');
			return res.json(users);
		} catch (err) {
			console.log(err);
			return res.status(500).json(err);
			// Error handling in case of server issues
		}
	},
	async createUser(req, res) {
		// Function to create a new user
		try {
			const user = await User.create(req.body);
			res.json(user);
		} catch (err) {
			res.status(500).json(err);
		}
	},
	async getSingleUser(req, res) {
		// Function to get a single user by their ID
		try {
			const user = await User.findOne({ _id: req.params.userId })
				.populate('thoughts')
				.populate('friends')
				.select('-__v');
				//Populating the user's thoughts and friends as uodated
			if (!user) {
				return res
					.status(404)
					.json({ message: 'User with provided ID not found' });

			}

			res.json(user);
		} catch (err) {
			console.log(err);
			return res.status(500).json(err);
		}
	},
	async updateUser(req, res) {
		// Function to update an existing user
		try {
			const user = await User.findOneAndUpdate(
				{ _id: req.params.userId },
				{ $set: req.body },
				{ runValidators: true, new: true }
			);
			// Updating the user with the provided ID
			if (!user) {
				return res
					.status(404)
					.json({ message: 'User with provided ID not found' });
			}
			res.json(user);
		} catch (err) {
			res.status(500).json(err);
		}
	},
	async deleteUser(req, res) {
		// Function to delete a user and associated thoughts
		try {
			const user = await User.findOneAndDelete({ _id: req.params.userId });
			if (!user) {
				return res.status(404).json({ message: 'User with provided ID not found' });
			}
			await Thought.deleteMany({ _id: { $in: user.thoughts } });
			// Deleting all thoughts associated with the user
			res.json({ message: 'User and associatwd thoughts deleted' });
		} catch (err) {
			res.status(500).json(err);
		}

	},

	async addFriend(req, res) {
		// Function to add a friend to a user's friend list via ID
		try {
			const user = await User.findOneAndUpdate(
				{ _id: req.params.userId },
				{ $addToSet: { friends: req.params.friendId } },
				{ runValidators: true, new: true }
			)
			if (!user) {
				return res.json(404).json( { message: 'User with provided ID not found' } );
			}
			res.json(user)

		} catch (err) {
			res.status(500).json(err);
		}
	},
	async removeFriend(req, res) {
		// Function to remove a friend from a user's friend list via ID
		try {
			const user = await User.findOneAndUpdate(
				{ _id: req.params.userId },
				{ $pull: { friends: req.params.friendId } },
				{ new: true }
			)
			if (!user) {
				return res.json(404).json( { message: 'User with provided ID not found'} );
			}
			res.json(user)} catch(err) {res.status(500).json(err)}
	}
};