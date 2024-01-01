const { Thought, User } = require('../models');

const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: 'reactions',
        select: '-__v',
      })
      .select('-__v')
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  getThoughtById(req, res) {
    const { thoughtId } = req.params;

    Thought.findById(thoughtId)
      .populate({
        path: 'reactions',
        select: '-__v',
      })
      .select('-__v')
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'Thought not found.' });
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },

  createThought(req, res) {
    const { thoughtText, username } = req.body;

    Thought.create({ thoughtText, username })
      .then((thought) => {
        // Add the created thought to the associated user's thoughts
        return User.findByIdAndUpdate(
          thought.userId,
          { $push: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found.' });
        }
        res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },

  updateThought(req, res) {
    const { thoughtId } = req.params;
    const { thoughtText } = req.body;

    Thought.findByIdAndUpdate(thoughtId, { thoughtText }, { new: true })
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'Thought not found.' });
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },

  deleteThought(req, res) {
    const { thoughtId } = req.params;

    Thought.findByIdAndDelete(thoughtId)
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'Thought not found.' });
        }

        // Remove thought from associated user's thoughts
        return User.findByIdAndUpdate(
          thought.userId,
          { $pull: { thoughts: thoughtId } },
          { new: true }
        );
      })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found.' });
        }
        res.json({ message: 'Thought and associated user data updated.' });
      })
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = thoughtController;