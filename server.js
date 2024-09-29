const express = require('express');
const path = require('path');
const app = express();
const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
const { MongoClient: Client, ServerApiVersion } = require('mongodb');
const { Console } = require('console');
const uri = "mongodb+srv://saumyamehta0610:ychD7CPTI2LsOgIC@cluster0.v9v25.mongodb.net/";
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
      console.log(data["password"])
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

app.post("/register", (req,res,next) => {
  const data=[];
  
    console.log("Hiiii")
    req.on('data',async (data)=>{
      data=JSON.parse(data)
      await client.connect();
      const database = client.db("StressBud");
      const usersCollection = database.collection("Users");
      const currUser = await usersCollection.findOne({username:data["username"]});
      const users = await usersCollection.find({}).toArray();
      const currEmail = await usersCollection.findOne({email:data["email"]});



      //console.log(users[0]["password"])
      // console.log(data)
      // console.log("Hi")
      console.log(users)
      if(currUser)
      {
        res.status(500).send('Username already exists!!');
        console.log(users[users.length-1])

      }
      else if(currEmail){
        res.status(500).send('Email already exists!!');
        console.log(users[users.length-1])

      }
      else if(data["name"]==="" || data["username"]==="" || data["email"]=== "" || data["pass"]==="" || data["pas"]==="" || data["age"]==="" || data["gender"]==="" || data["bio"]==="" || data["hobby_1"]==="" || data["hobby_2"]==="" || data["hobby_3"]==="" ){
        res.status(500).send('One or More field is empty!!');
        // console.log(users[users.length-1])
      }
      else if(data["pass"] !== data["pas"])
      {
        res.status(200).send('Passwords Do Not Match');

      }
      else
      {
        // console.log("Success")
        const result=await usersCollection.insertOne({id: users.length,name: data["name"], username: data["username"], email: data["email"], password: data["pass"], age: data["age"], gender: data["gender"], bio: data["bio"], hobby1: data["hobby_1"], hobby2: data["hobby_2"], hobby3: data["hobby_3"]})
        console.log(users[users.length-1])
        res.status(200).send('Registration Successfull!!');      
      }
    
    })
  

})
// Starting the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

