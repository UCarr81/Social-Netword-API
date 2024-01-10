const express = require('express');
const router = express.Router();

const {
  getAllThoughts,
  getThoughtsById,
  createThoughts, 
  updateThoughts,
  deleteThoughts,
 // addReaction,
 // removeReaction,
} = require('../../controllers/thoughtsController');

router.get('/', getAllThoughts);
router.get('/:thoughtsId', getThoughtsById);
router.post('/', createThoughts); 
router.put('/:thoughtsId', updateThoughts);
router.delete('/:thoughtsId', deleteThoughts);
//router.post('/:thoughtsId/reactions', addReaction);
//router.delete('/:thoughtsId/reactions/:reactionId', removeReaction);

module.exports = router;
