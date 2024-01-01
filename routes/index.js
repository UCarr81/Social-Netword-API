const express = require('express');
const router = express.router();

const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');
const reactionRoutes = require('/reactionRoutes');

router.use('/api/users', userRoutes);
router.use('/api/thoughts', thoughtRoutes);
router.user('/api/reactions', reactionRoutes);

module.exports = router;
