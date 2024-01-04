const express = require("express");
const mongoose = require("mongoose");
const cors=require("cors");
const Cap = require('./Cap');

const app = express();
const port = 5000;
app.use(express.json()); // Added line to include the express.json() middleware
app.use(cors({origin:'*'}))
require('dotenv').config();
// Connect to MongoDB
mongoose.connect(`${process.env.DATABASE_URL}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to the database!!");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

// Middleware to parse JSON in the request body
app.use(express.json());

// Route to handle POST requests for creating a new document
app.post('/caps', async (req, res) => {
  try {
    const {
      partnumber,
      package,
      bvdss,
      rds,
      qg,
      pdw,
      configuration,
      polarity
    } = req.body;

    // Create a new cap document
    const newCap = new Cap({
      partnumber,
      package,
      bvdss,
      rds,
      qg,
      pdw,
      configuration,
      polarity
    });

    // Save the document to the database
    await newCap.save();

    res.status(201).json({ message: 'Cap data created successfully', data: newCap });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
