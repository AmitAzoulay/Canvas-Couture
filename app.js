const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const session = require('express-session');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes'); // From the main branch

const server = express();

// Use CORS with specific options
server.use(cors({
    origin: 'http://localhost:3000', // Adjust based on your frontend URL
    credentials: true, // Allow credentials (cookies)
}));

server.use(express.static('public'));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.set("view engine", "ejs");

// Set up session management
server.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Define routes
server.use('/products', require('./routes/productsRoutes'));
server.use('/order', require('./routes/ordersRoutes'));
server.use('/', userRoutes); // This route replaces the previous index route
server.use('/contact', require('./routes/contactRoutes'))
server.use('/payment', require('./routes/paymantRoutes'))

// Connect to MongoDB
mongoose.connect(process.env.DB_URI)
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.error('Database connection error:', err));

// Listen on the specified port
const port = process.env.PORT || process.env.port; // Use whichever is defined
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});