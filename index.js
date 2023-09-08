// Import required modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Set up body parser middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Import your router module
const router = require('./router'); // Assuming your router is in a file named router.js

// Use the router for specific routes
app.use('/api', router); // All routes in the router will be prefixed with '/api'

// Define a default route
app.get('/', (req, res) => {
  res.send('Welcome to the Express.js server');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});