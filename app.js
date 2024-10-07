const mongoose = require('mongoose');
const express = require('express')
var cors = require('cors')
const session = require('express-session');
require('dotenv').config();
const { injectSession } = require('./middleware/inject-session-middleware.js'); // Import the session middleware



const server = express()
// Set up session management
server.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
server.use(cors({
    origin: 'http://localhost:3000', // Adjust based on your frontend URL
    credentials: true, // Allow credentials (cookies)
}));
server.use(injectSession);
server.use(express.static('public'));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
// Use the injectSession middleware globally

server.set("view engine", "ejs");




// Define routes
server.use('/products', require('./routes/productsRoutes'));
server.use('/order', require('./routes/ordersRoutes'));
server.use('/', require('./routes/userRoutes')); // This route replaces the previous index route
server.use('/', require('./routes/indexRoutes'));
server.use('/payment', require('./routes/paymentRoutes'));
server.use("/", require('./routes/profileRoutes'));
server.use("/admin", require('./routes/adminRoutes'));
server.use('/contact', require('./routes/contactRoutes'))
server.use('/info', require('./routes/infoRoutes'))
server.use('/', require('./routes/branchRoutes'))
server.use('/', require('./routes/twitterRoutes.js')); // Make sure you're using the correct prefix

// Connect to MongoDB
mongoose.connect(process.env.DB_URI)
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.error('Database connection error:', err));


server.listen(process.env.port, () => {
    console.log(`server listening on port ${process.env.port}`)
})