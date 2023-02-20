// Import necessary packages
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Setup an empty data object to store weather journal entries
let projectData = {};

// Initialize the Express app
const app = express();

// Use body-parser, cors middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("website"));

// Route to get the most recent weather journal entry
app.get("/weather", (req, res) => {
  res.send(projectData);
});

// Route to add a new weather journal entry
app.post("/weather", (req, res) => {
  projectData = {
    date: req.body.date,
    temp: req.body.temp,
    feelings: req.body.feelings,
  };
  res.send(projectData);
  console.log(projectData.date);
  console.log(projectData.temp);
  console.log(projectData.feelings);
});

// Start the server
const port = 8000;
const server = app.listen(port, () => {
  console.log(`Server running on localhost:${port}`);
});
