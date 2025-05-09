const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

// Define a route
app.use(express.static(path.join(__dirname,'layout')));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

