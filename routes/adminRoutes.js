const express = require('express');
const { isAdmin } = require('../middleware/isAdminMiddleware');
const router = express.Router();

//protected route to admin dashboard
router.get("/admin/dashboard", isAdmin, (req, res) => {
    res.render("adminDashboard", { user: req.session.user });
});
module.exports = router;