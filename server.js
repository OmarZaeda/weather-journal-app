// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// Port
const port = 3000;
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
app.listen(port, function setupServer() {
  console.log(`Server is running on: localhost:${port}`);
});

// Get, Post

app.get("/all", (req, res) => {
  res.send(projectData).status(222);
});
app.post("/data", (res, req) => {
  projectData = {
    temp: request.body.temp,
    data: request.body.date,
    content: request.body.conetet,
  };
  response.send(projectData).status(222);
});
