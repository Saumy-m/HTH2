const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://rayyan:vjwn4SIN2q29mwvl@cluster0.zrpw9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
      school: 0,
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
      school: 0,
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
      school: 0,
      age: 20,
      gender: "M",
      bio: "I wanna go outside ;-;",
      hobby1: "Programming",
      hobby2: "Singing",
      hobby3: "Sleeping"
    };
    users[3] = {
      id: 3,
      name: "John Doe",
      username:"johndoe",
      email: "johndoe@cmail.carleton.ca",
      password: "jo",
      school: 0,
      age: 20,
      gender: "M",
      bio: "Sleepy Joe ;-;",
      hobby1: "Sleeping",
      hobby2: "Gaming",
      hobby3: "Gym"
    };
    users[4] = {
      id: 4,
      name: "Donald Trump",
      username:"donaldtrump",
      email: "donaldtrump@cmail.carleton.ca",
      password: "don",
      school: 0,
      age: 20,
      gender: "M",
      bio: "They are eating the dogs",
      hobby1: "Gym",
      hobby2: "Pokemon Go",
      hobby3: "Sleeping"
    };



    // Insert the document into the collection
    await collection.deleteMany({})
    await collection.insertOne(users[0]);
    await collection.insertOne(users[1]);
    await collection.insertOne(users[2]);
    await collection.insertOne(users[3]);
    await collection.insertOne(users[4]);
    console.log(await collection.find({}).toArray())
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);
