const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/connection');
const routes = require('./routes');

const app = express();
const MONGODB_PORT = 27017; 
const PORT = process.env.PORT || 3001; 


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(routes);

mongoose.set('debug', true);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});