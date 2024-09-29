const express = require('express');
const path = require('path');
const app = express();
const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
const { MongoClient: Client, ServerApiVersion } = require('mongodb');
const { Console } = require('console');
const uri = "mongodb+srv://rayyan:vjwn4SIN2q29mwvl@cluster0.zrpw9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const port = 3000;
var session = require('express-session')
let db;

const client = new Client(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

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

app.get('/register.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'backend/jsfiles', 'register.js'));

});


app.get('/style.css', (req, res) => {

  res.sendFile("style.css",{root:`${__dirname}/frontend`})
})



//POST

app.post("/login", (req,res,next) => {
  const data=[];
  
  
    req.on('data',async (data)=>{
      data=JSON.parse(data)
      await client.connect();
      const database = client.db("StressBud");
      const usersCollection = database.collection("Users");
      const users = await usersCollection.find({username:data["username"]}).toArray();

      //console.log(users[0]["password"])
      //console.log(data["password"])
      if(users.length==0)
      {
        res.status(500).send('Bad Request');
      }  
      else if((users[0]["password"]===data["password"]))
      {
        res.status(200).send('Login Sucessful!');
      }
      else
      {
        res.status(500).send('Bad Request');
      }
    
        
      
    })
  

})
// Starting the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

