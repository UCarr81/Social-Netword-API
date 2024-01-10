const { User, Thoughts } = require('../models');

const thoughtsController = {
  getAllThoughts(req, res) {
    Thoughts.find({})
      .populate({
        path: 'reactions',
        select: '-__v',
      })
      .select('-__v')
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  getThoughtsById(req, res) {
    const { thoughtsId } = req.params;

    Thoughts.findById(thoughtsId)
      .populate({
        path: 'reactions',
        select: '-__v',
      })
      .select('-__v')
      .then((thoughts) => {
        if (!thoughts) {
          return res.status(404).json({ message: 'Thoughts not found.' });
        }
        res.json(thoughts);
      })
      .catch((err) => res.status(500).json(err));
  },

  createThoughts: async (req, res) => {
    try {
      const { thoughtsText, username } = req.body;
      const thoughts = await Thoughts.create({ thoughtsText, username });
  
      const userId = req.userId;
      const user = await User.findByIdAndUpdate(
        userId,
        { $push: { thoughts: thoughts._id } },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  updateThoughts(req, res) {
    const { thoughtsId } = req.params;
    const { thoughtsText } = req.body;

    Thoughts.findByIdAndUpdate(thoughtsId, { thoughtsText }, { new: true })
      .then((thoughts) => {
        if (!thoughts) {
          return res.status(404).json({ message: 'Thought not found.' });
        }
        res.json(thoughts);
      })
      .catch((err) => res.status(500).json(err));
  },

  deleteThoughts(req, res) {
    const { thoughtsId } = req.params;

    Thoughts.findByIdAndDelete(thoughtsId)
      .then((thoughts) => {
        if (!thoughts) {
          return res.status(404).json({ message: 'Thoughts not found.' });
        }
        return User.findByIdAndUpdate(
          thoughts.userId,
          { $pull: { thoughts: thoughtsId } },
          { new: true }
        );
      })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found.' });
        }
        res.json({ message: 'Thoughts and associated user data updated.' });
      })
      .catch((err) => res.status(500).json(err));
  },

    createReactions(req, res) {
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
  
    removeReactions(req, res) {
      const { thoughtsId, reactionId } = req.params;
  
      Thoughts.findByIdAndUpdate(
        thoughtsId,
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


module.exports = thoughtsController;
