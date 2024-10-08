const express = require('express');
const { isAdmin } = require('../middleware/isAdminMiddleware');
const router = express.Router();
const adminController = require('../controllers/adminController')
const userController = require('../controllers/userController')
const paymentController = require('../controllers/paymantController')

require('dotenv').config();

router.get("/dashboard", isAdmin, adminController.getAllStatistics);

// Route to get all products
router.get('/products', isAdmin, adminController.getAllProducts);

// POST route to add a new product
router.post('/products/add', isAdmin, adminController.addProduct); // Add new product
// Route to edit a product
router.put('/products/edit', isAdmin, adminController.editProduct);


// Route to delete a product
router.delete('/products/delete', isAdmin, adminController.deleteProduct);
// Add route for admin user creation
router.post("/newUser", isAdmin, userController.registerUser);

// Fetch all users
router.get('/users', isAdmin, adminController.getAllUsers);

// Update user
router.put('/users/update', isAdmin, adminController.updateUser);

// Delete user
router.delete('/users/delete', isAdmin, adminController.deleteUser);

// Delete payment
router.put('/payment/:paymentId', paymentController.updatePayment);
router.get('/payments', paymentController.getAllPayments);
router.delete('/payment/:paymentId', paymentController.deletePayment);

module.exports = router;