const express = require('express');
const { isAdmin } = require('../middleware/isAdminMiddleware');
const router = express.Router();

//protected route to admin dashboard
router.get("/dashboard", isAdmin, (req, res) => {
    res.render("admin", { user: req.session.user });
    
});
module.exports = router;