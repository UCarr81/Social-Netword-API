const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');
const reactionRoutes = require('./reactionRoutes');

router.use('/api/users', userRoutes);
router.use('/api/thoughts', thoughtRoutes);
router.use('/api/reactions', reactionRoutes);

module.exports = router;
