const express = require('express');
const { isAdmin } = require('../middleware/isAdminMiddleware');
const upload  = require('../middleware/multerConfig'); // Multer configuration for file uploads
const router = express.Router();
const adminController = require('../controllers/adminController')
const userController = require('../controllers/userController')
const paymentController = require('../controllers/paymantController')

require('dotenv').config();

router.get("/dashboard", isAdmin, adminController.getAllStatistics);

// Route to get all products
router.get('/products', isAdmin, adminController.getAllProducts);

// POST route to add a new product
router.post('/products/add', isAdmin,upload.single('image'), adminController.addProduct); // Add new product
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

// Route to search users
router.get('/users/search', adminController.searchUsers);

// Fetch all orders
router.get('/orders', isAdmin, adminController.getAllOrders);

// Route to search orders by status
router.get('/orders/search',isAdmin, adminController.searchOrdersByStatus);

// Update order
router.put('/orders/update', isAdmin, adminController.updateOrder);

// Delete order
router.delete('/orders/delete',isAdmin, adminController.deleteOrder);

// POST route to add a new branch
router.post('/branches/add', isAdmin, adminController.addBranch);

// Fetch all branches
router.get('/branches',isAdmin, adminController.getAllBranches);

// Update branch
router.put('/branches/update',isAdmin, adminController.updateBranch);

// Delete branch
router.delete('/branches/delete',isAdmin, adminController.deleteBranch);
// payment
router.put('/payment/:paymentId',isAdmin, paymentController.updatePayment);
router.get('/payments',isAdmin, paymentController.getAllPayments);
router.delete('/payment/:paymentId',isAdmin, paymentController.deletePayment);
module.exports = router;
