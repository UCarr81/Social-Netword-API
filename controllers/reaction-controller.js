// ./controllers/reactionController.js
const { Thought } = require('../models');

const reactionController = {
  createReaction(req, res) {
    const { thoughtId } = req.params;
    const { reactionBody, username } = req.body;

    Thought.findByIdAndUpdate(
      thoughtId,
      { $push: { reactions: { reactionBody, username } } },
      { new: true }
    )
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'Thought not found.' });
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },

  removeReaction(req, res) {
    const { thoughtId, reactionId } = req.params;

    Thought.findByIdAndUpdate(
      thoughtId,
      { $pull: { reactions: { _id: reactionId } } },
      { new: true }
    )
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'Thought not found.' });
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = reactionController;
