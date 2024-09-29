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

const loggedin=[]

const client = new Client(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.use(session({
  secret: 'some secret here', 
  cookie: {username:undefined ,login:false},  
  resave: true,
  saveUninitialized: true

}))

app.set("view engine", "pug");
app.set("views","frontend")

// Basic route for the homepage
app.get('/', async (req, res) => {
  if(loggedin.length>0)
  {
    //This means that the user is logged in, we must get the other memebers and allow the user to like or dislike them

    await client.connect();
    const database = client.db("SkillBuddy");
    const usersCollection = database.collection("Users");
    const loggedinUser = await usersCollection.find({username:loggedin[0]}).toArray();
    //Now we find the users possible matches
    let matches=[]
    matches= await usersCollection.find({}).toArray();
    let n=matches.length
    let total=0;
    for (let i = 0; i < n; i++) {
      {

        if(matches[i]["hobby1"]==loggedinUser[0]["hobby1"])
        {
          total+=3
        }
        if(matches[i]["hobby2"]==loggedinUser[0]["hobby2"])
        {
          total+=2
        }
        if(matches[i]["hobby3"]==loggedinUser[0]["hobby3"])
        {
          total+=1
        }
        if(matches[i]["hobby1"]==loggedinUser[0]["hobby3"])
          {
            total+=2
          }
          if(matches[i]["hobby3"]==loggedinUser[0]["hobby1"])
          {
            total+=1
          }
        matches[i]["total"]=total
        total=0;

                
      }
    }
    matches.splice(0,1)
    matches.sort((a, b) => b.total - a.total);
    console.log(matches)
    res.status(200).render("mainpage.pug",{username:req.session.username,matches:matches})
  }
  else{

   res.sendFile(path.join(__dirname, 'frontend', 'home.html'));
  }
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
app.get('/main.css', (req, res) => {

  res.sendFile("main.css",{root:`${__dirname}/frontend`})
})



//POST

app.post("/login", (req,res,next) => {
  const data=[];
  
  
    req.on('data',async (data)=>{
      data=JSON.parse(data)
      await client.connect();
      const database = client.db("SkillBuddy");
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
        req.session.username=data["username"]
        req.session.login=true;
        loggedin.push(req.session.username)
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
      const database = client.db("SkillBuddy");
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

