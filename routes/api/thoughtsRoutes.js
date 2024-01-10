const express = require('express');
const router = express.Router();

const {
  getAllThoughts,
  getThoughtsById,
  createThoughts, 
  updateThoughts,
  deleteThoughts,
  createReactions,
  removeReactions,
} = require('../../controllers/thoughtsController');

router
  .route('/')
  .get(getAllThoughts)
  .post(createThoughts);

router
.route('/:id')
.get(getThoughtsById)
.put(updateThoughts)
.delete(deleteThoughts)

router
  .route('/:thoughtsId/reactions')
  .post(createReactions)

router
  .route('/:thoughtsId/reactions/:reactionId')
  .delete(removeReactions)

// Thanks to Civ187 For this File Format Example! Much Easier to read

module.exports = router;
