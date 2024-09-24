const mongoose = require('mongoose');
const express = require('express')
var cors = require('cors')
const session = require('express-session');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const indexRoutes = require('./routes/index');

const server = express()
//server.use(cors())
server.use(cors({
    origin: 'http://localhost:3000', // Adjust based on your frontend URL
    credentials: true, // Allow credentials (cookies)
}));
server.use(express.static('public'))
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.set("view engine", "ejs");

// Set up session
server.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Define routes
server.use('/products', require('./routes/products'));
server.use('/order', require('./routes/orders'));
server.use('/', userRoutes); // This route replaces the previous index route

// Connect to MongoDB
mongoose.connect(process.env.DB_URI)
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.error('Database connection error:', err));

server.use('/', userRoutes); 
server.use('/', indexRoutes); 

server.listen(process.env.port, () => {
    console.log(`server listening on port ${process.env.port}`)
})
