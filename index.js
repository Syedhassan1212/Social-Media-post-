require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { generatePost } = require('./data');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Get a specified number of recent posts
app.get('/api/posts', (req, res) => {
  const count = parseInt(req.query.count) || 10;
  const posts = [];
  for(let i = 0; i < count; i++){
    posts.push(generatePost());
  }
  // Sort posts by timestamp descending
  posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  res.json({ success: true, count: posts.length, data: posts });
});

// SSE Endpoint for real-time streaming simulation
app.get('/api/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Send an initial connected message
  res.write(`data: ${JSON.stringify({ type: "system", message: "Connected to Karachi Incident Stream" })}\n\n`);

  // Send a random post periodically
  const sendPost = () => {
    const post = generatePost();
    // Update timestamp to now for stream
    post.timestamp = new Date().toISOString(); 
    res.write(`data: ${JSON.stringify(post)}\n\n`);
  };

  // Initial burst of recent posts
  sendPost();

  // interval: 2 to 5 seconds
  const interval = setInterval(sendPost, Math.floor(Math.random() * 3000) + 2000);

  req.on('close', () => {
    clearInterval(interval);
  });
});

app.get('/', (req, res) => {
  res.send(`
    <h1>Karachi Incident Social Media API</h1>
    <p>A mock API to simulate real-time social media posts about incidents (fire, accident, robbery, etc.) in Karachi.</p>
    <h2>Endpoints:</h2>
    <ul>
      <li><code>GET /api/posts?count=10</code> - Get random incident posts (simulated past posts)</li>
      <li><code>GET /api/stream</code> - Connect to Server-Sent Events (SSE) for a real-time continuous stream of new incidents</li>
    </ul>
    <p>Use this for your bot or web dashboard to get real-time simulation.</p>
  `);
});

app.listen(PORT, () => {
  console.log(`Karachi Incident API Server is running on port ${PORT}`);
});
