const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Basic route for the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'home.html'));

});

app.get('/home.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'backend/jsfiles', 'home.js'));

});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'log_in.html'));

});

app.get('/login.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'backend/jsfiles', 'login.js'));

});


app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'register.html'));

});




app.get('/style.css', (req, res) => {

  res.sendFile("style.css",{root:`${__dirname}/frontend`})
})
// Starting the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

