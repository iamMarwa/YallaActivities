// Import the express function
const express = require('express'); 
const mongoose = require('mongoose');

const cors = require('cors');

require('dotenv').config()
// express() returns an object with all kinds
// of methods for handling HTTP requests
const server = express();



// Import the user routes
const userRoutes = require('./routes/user_routes.js');



// Connect to MongoDB using mongoose
// DON'T FORGET TO PASTE CONNECTION STRING
const connectionString = process.env.MONGODB_CONNECTION_STRING;

const connectionConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose
.connect(connectionString, connectionConfig)
.then(
    function() {
        console.log("DB is connected");
    }
)
.catch(
    function(dbError) {
        console.log("error occured", dbError)
    }
);


// Configuration
// Configure for POST request
server.use( express.urlencoded({ extended: false }) );
// Configure for JSON format
server.use( express.json() );
// Configure for routes
server.use('/users', userRoutes);


// A GET route
server.get(
    '/', // document
    function (req, res) { //callback function
        res.sendFile(__dirname + "/index.html");
    }
);

server.get(
    '/signup', // document
    function (req, res) { //callback function
        res.sendFile(__dirname + "/registration.html");
    }
);
server.get(
    '/login',
    function(req, res){
        res.sendFile(__dirname + "/login.html");
    }
)


server.listen(
    3001,
    function() {
        console.log('Server running on http://localhost:3001/')
    }
);