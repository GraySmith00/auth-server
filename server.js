const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

// Import Routes
const authRoutes = require('./src/modules/auth/auth.routes');
const postRoutes = require('./src/modules/posts/posts.routes');

// Initialize Express App
const app = express();
app.get('/', (_, res) => {
  res.send({ message: 'Server is up and running!' });
});

// App Setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));

// Routes
app.use('/api/user', authRoutes);
app.use('/api/posts', postRoutes);

// DB Setup
const db = process.env.MONGO_URI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// Server Setup
const port = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
