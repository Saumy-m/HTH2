const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Basic route for the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'home.html'));

});

// Starting the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

