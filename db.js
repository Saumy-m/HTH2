const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://saumyamehta0610:ychD7CPTI2LsOgIC@cluster0.v9v25.mongodb.net/";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const database = client.db("StressBud"); 
    const collection = database.collection("Users"); 

    // Create a document to insert
    let users={}
    users[0] = {
      id: 0,
      name: "Rayyan Sait",
      username:"rayyansait",
      email: "rayyansait@cmail.carleton.ca",
      password: "Ray",
      age: 20,
      gender: "M",
      bio: "GYM RAT!",
      hobby1: "Gym",
      hobby2: "Gaming",
      hobby3: "Programming"
    };
    users[1] = {
      id: 1,
      name: "Damon Gee",
      username:"damongee",
      email: "damongee@cmail.carleton.ca",
      password: "DemonTheGeek",
      age: 21,
      gender: "M",
      bio: "Pokemon Go enjoyer",
      hobby1: "Pokemon Go",
      hobby2: "Photography",
      hobby3: "Programming"
    };
    users[2] = {
      id: 2,
      name: "Saumya Mehta",
      username:"saumyamehta",
      email: "saumyamehta@cmail.carleton.ca",
      password: "CSS_03",
      age: 20,
      gender: "M",
      bio: "I wanna go outside ;-;",
      hobby1: "Programming",
      hobby2: "Singing",
      hobby3: "Sleeping"
    };

    // Insert the document into the collection
    await collection.deleteMany({})
    await collection.insertOne(users[0]);
    await collection.insertOne(users[1]);
    await collection.insertOne(users[2]);
    console.log(await collection.find({}).toArray())
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);
