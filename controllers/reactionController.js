// ./controllers/reactionController.js
const { Thoughts } = require('../models');

const reactionController = {
  createReaction(req, res) {
    const { thoughtsId } = req.params;
    const { reactionBody, username } = req.body;

    Thoughts.findByIdAndUpdate(
      thoughtsId,
      { $push: { reactions: { reactionBody, username } } },
      { new: true }
    )
      .then((thoughts) => {
        if (!thoughts) {
          return res.status(404).json({ message: 'Thoughts not found.' });
        }
        res.json(thoughts);
      })
      .catch((err) => res.status(500).json(err));
  },

  removeReaction(req, res) {
    const { thoughtsId, reactionId } = req.params;

    Thoughts.findByIdAndUpdate(
      thoughtId,
      { $pull: { reactions: { _id: reactionId } } },
      { new: true }
    )
      .then((thoughts) => {
        if (!thoughts) {
          return res.status(404).json({ message: 'Thoughts not found.' });
        }
        res.json(thoughts);
      })
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = reactionController;
