// ./controllers/userController.js
const { User, Thoughts } = require('../models');

const userController = {
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        select: '-__v',
      })
      .populate({
        path: 'friends',
        select: '-__v',
      })
      .select('-__v')
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  getUserById(req, res) {
    const { userId } = req.params;

    User.findById(userId)
      .populate({
        path: 'thoughts',
        select: '-__v',
      })
      .populate({
        path: 'friends',
        select: '-__v',
      })
      .select('-__v')
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found.' });
        }
        res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },

  createUser(req, res) {
    const { username, email } = req.body;

    User.create({ username, email })
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  updateUser(req, res) {
    const { userId } = req.params;
    const { username, email } = req.body;

    User.findByIdAndUpdate(userId, { username, email }, { new: true })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found.' });
        }
        res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },

  deleteUser(req, res) {
    const { userId } = req.params;

    User.findByIdAndDelete(userId)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found.' });
        }
        return Thoughts.deleteMany({ userId: user._id });
      })
      .then(() => res.json({ message: 'User and associated thoughts deleted.' }))
      .catch((err) => res.status(500).json(err));
  },

  addFriend(req, res) {
    const { userId, friendId } = req.params;

    User.findByIdAndUpdate(userId, { $addToSet: { friends: friendId } }, { new: true })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found.' });
        }
        res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },

  removeFriend(req, res) {
    const { userId, friendId } = req.params;

    User.findByIdAndUpdate(userId, { $pull: { friends: friendId } }, { new: true })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found.' });
        }
        res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },
};


//Delete User
module.exports = userController;
