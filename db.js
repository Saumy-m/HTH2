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
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // Specify the database and collection
    const database = client.db("StressBud"); // replace with your database name
    const collection = database.collection("Users"); // replace with your collection name

    // Create a document to insert
    const doc = {
      name: "Rayyan Sait",
      password: "Ray"
      // Add other fields as needed
    };

    // Insert the document into the collection
    const result = await collection.insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);
