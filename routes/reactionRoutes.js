const express = require('express');
const router = express.Router();
const {
  createReaction,
  removeReaction,
} = require('../controllers/reactionController');

router.post('/:thoughtId/reactions', createReaction);
router.delete('/:thoughtId/reactions/:reactionId', removeReaction);

module.exports = router;
