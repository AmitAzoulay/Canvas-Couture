const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const session = require('express-session');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');

const server = express();

// Use CORS with specific options
server.use(cors({
    origin: 'http://localhost:3000', // Adjust based on your frontend URL
    credentials: true, // Allow credentials (cookies)
}));

// Serve static files from 'public' folder
server.use(express.static('public'));

// Parse JSON and URL-encoded bodies
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Set view engine to EJS
server.set("view engine", "ejs");

// Set up session management
server.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Define routes
server.use('/products', require('./routes/products'));
server.use('/order', require('./routes/orders'));
server.use('/', userRoutes);

// Connect to MongoDB
mongoose.connect(process.env.DB_URI)
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.error('Database connection error:', err));

// Listen on the specified port
const port = process.env.PORT || process.env.port; // Use whichever is defined
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

