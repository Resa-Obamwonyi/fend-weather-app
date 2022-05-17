// Setup empty JS object to act as endpoint for all routes
projectData = {}

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
const cors =  require('cors');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({'extended':false}));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Spin up the server
const server = app.listen(3000, serverUp)

// Callback to debug
function serverUp(){
    console.log("listening on port 3000")
}

// Initialize all route with a callback function

// Callback function to complete GET '/all'

// Post Route
