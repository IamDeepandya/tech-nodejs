const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const db = require('./db');
const postRoutes = require('./router/post');
const authMiddleware = require('./middlewares/auth.js');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(passport.initialize());
require('./config/passport');

// Routes
app.use('/posts', authMiddleware, postRoutes);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});