const express = require('express');
const { isAdmin } = require('../middleware/isAdminMiddleware');
const router = express.Router();
const adminController = require('../controllers/adminController')

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


module.exports = router;