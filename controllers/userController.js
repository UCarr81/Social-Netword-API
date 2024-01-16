// ./controllers/userController.js

console.log('working?');
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
      .catch((err) => {
         res.status(500).json(err)
        return;
      });
},

getUserById(req, res) {
  const { id } = req.params;
  console.log(req.params);
  
  User.findById(id)
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
    .catch((err) => {
      res.status(500).json(err);
      return; // Add this return statement
    });
},

createUser(req, res) {
  const { username, email } = req.body;

  User.create({ username, email })
    .then((user) => res.json(user))
    .catch((err) => {
      res.status(500).json(err);
      return;
    });
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
    .catch((err) => {
      res.status(500).json(err);
      return;
    });
},

deleteUser(req, res) {
  const { id } = req.params;

  User.findByIdAndDelete(id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
      return Thoughts.deleteMany({ id: user._id });
    })
    .then(() => res.json({ message: 'User and associated thoughts deleted.' }))
    .catch((err) => {
      res.status(500).json(err);
      return;
    });
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
    .catch((err) => {
      res.status(500).json(err);
      return;
    });
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


module.exports = userController;
