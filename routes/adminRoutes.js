const express = require('express');
const { isAdmin } = require('../middleware/isAdminMiddleware');
const router = express.Router();
const adminController = require('../controllers/adminController')
const userController = require('../controllers/userController')


//protected route to admin dashboard
router.get("/dashboard", isAdmin, (req, res) => {
    console.log("admin routes");
    res.render("admin", { user: req.session.user });
    
});
// Route to get all products
router.get('/products', isAdmin, adminController.getAllProducts);

// POST route to add a new product
router.post('/products/add', isAdmin,adminController.addProduct); // Add new product
// Route to edit a product
router.put('/products/edit',isAdmin, adminController.editProduct);


// Route to delete a product
router.delete('/products/delete', isAdmin,adminController.deleteProduct);
// Add route for admin user creation
router.post("/newUser",isAdmin, userController.registerUser);

// Fetch all users
router.get('/users',isAdmin, adminController.getAllUsers);

// Update user
router.put('/users/update',isAdmin, adminController.updateUser);

// Delete user
router.delete('/users/delete',isAdmin, adminController.deleteUser);
module.exports = router;