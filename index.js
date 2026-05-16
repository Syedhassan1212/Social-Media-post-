require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { generatePost } = require('./data');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// DEFAULT ROUTE: Returns a single random post every time you refresh
app.get('/', (req, res) => {
  const post = generatePost();
  res.json({ success: true, data: post });
});

// BATCH ROUTE: Get a specified number of recent posts
app.get('/api/posts', (req, res) => {
  const count = parseInt(req.query.count) || 5; // Default to 5 if not specified
  const posts = [];
  for(let i = 0; i < count; i++){
    posts.push(generatePost());
  }
  // Sort posts by timestamp descending
  posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  res.json({ success: true, count: posts.length, data: posts });
});

app.listen(PORT, () => {
  console.log(`Lightweight Karachi Incident API Server is running on port ${PORT}`);
});
