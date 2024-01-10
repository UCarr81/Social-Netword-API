const express = require('express');
const router = express.Router();
const {
  createReaction,
  removeReaction,
} = require('../../controllers/reactionController');

router.post('/:thoughtsId/reactions', createReaction);
router.delete('/:thoughtsId/reactions/:reactionId', removeReaction);


module.exports = router;
