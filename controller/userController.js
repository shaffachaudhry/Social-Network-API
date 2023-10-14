const { User, Thought } = require('../models');

module.exports = {
	async getUsers(req, res) {
		try {
			const users = await User.find()
			.select('-__v');
			return res.json(users);
		} catch (err) {
			console.log(err);
			return res.status(500).json(err);
		}
	},
	async createUser(req, res) {
		try {
			const user = await User.create(req.body);
			res.json(user);
		} catch (err) {
			res.status(500).json(err);
		}
	},
	async getSingleUser(req, res) {
		try {
			const user = await User.findOne({ _id: req.params.userId })
				.populate('thoughts')
				.populate('friends')
				.select('-__v');

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
		try {
			const user = await User.findOneAndUpdate(
				{ _id: req.params.userId },
				{ $set: req.body },
				{ runValidators: true, new: true }
			);
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
		try {
			const user = await User.findOneAndDelete({ _id: req.params.userId });
			if (!user) {
				return res.status(404).json({ message: 'User with provided ID not found' });
			}
			await Thought.deleteMany({ _id: { $in: user.thoughts } });
			res.json({ message: 'User and associatwd thoughts deleted' });
		} catch (err) {
			res.status(500).json(err);
		}

	},

	async addFriend(req, res) {
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