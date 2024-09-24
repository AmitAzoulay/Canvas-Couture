const mongoose = require('mongoose');
<<<<<<< HEAD
const express = require('express')
var cors = require('cors')
const session = require('express-session');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const indexRoutes = require('./routes/index');

const server = express()
//server.use(cors())
=======
const express = require('express');
var cors = require('cors');
const session = require('express-session');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes'); // From the main branch

const server = express();

// Use CORS with specific options
>>>>>>> a7e9e7860e5afa36a98a2c0ddd9377b7e1aaeb19
server.use(cors({
    origin: 'http://localhost:3000', // Adjust based on your frontend URL
    credentials: true, // Allow credentials (cookies)
}));
<<<<<<< HEAD
server.use(express.static('public'))
=======

server.use(express.static('public'));
>>>>>>> a7e9e7860e5afa36a98a2c0ddd9377b7e1aaeb19
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.set("view engine", "ejs");

<<<<<<< HEAD
// Set up session
=======
// Set up session management
>>>>>>> a7e9e7860e5afa36a98a2c0ddd9377b7e1aaeb19
server.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

<<<<<<< HEAD
=======
// Define routes
server.use('/products', require('./routes/products'));
server.use('/order', require('./routes/orders'));
server.use('/', userRoutes); // This route replaces the previous index route

>>>>>>> a7e9e7860e5afa36a98a2c0ddd9377b7e1aaeb19
// Connect to MongoDB
mongoose.connect(process.env.DB_URI)
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.error('Database connection error:', err));

<<<<<<< HEAD
server.use('/', userRoutes); 
server.use('/', indexRoutes); 

server.listen(process.env.port, () => {
    console.log(`server listening on port ${process.env.port}`)
})
=======
// Listen on the specified port
const port = process.env.PORT || process.env.port; // Use whichever is defined
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
>>>>>>> a7e9e7860e5afa36a98a2c0ddd9377b7e1aaeb19
