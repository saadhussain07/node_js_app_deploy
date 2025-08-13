const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");

const PORT = 5050;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const MONGO_URL = process.env.MONGO_URL || "mongodb://admin:qwerty@mongo:27017/apnacollege-db";
const client = new MongoClient(MONGO_URL);

// GET all users
app.get("/getUsers", async (req, res) => {
  await client.connect(MONGO_URL);
  console.log("Connected successfully to MongoDB");

  const db = client.db("apnacollege-db");
  const data = await db.collection("users").find({}).toArray();

  client.close();
  res.json(data);
});

// POST new user
app.post("/addUser", async (req, res) => {
  const userObj = req.body;
  console.log("Adding user:", userObj);

  await client.connect(MONGO_URL);
  console.log("Connected successfully to MongoDB");

  const db = client.db("apnacollege-db");
  const result = await db.collection("users").insertOne(userObj);
  console.log("Data inserted:", result);

  client.close();
  res.status(201).json({ message: "User added successfully", result });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
