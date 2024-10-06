// Middleware to check if the user is an admin
function isAdmin(req, res, next) {
    
    // Check if the user is logged in and if they have admin rights
    if (req.session.isActive && req.session.isAdmin) {
        // User is logged in and is an admin, proceed to the next middleware
        console.log("success ",req.session.userId," is admin")
        return next();
    } else {
        // User is not an admin, redirect or send a forbidden response
        return res.status(403).send("Access denied. Admins only.");
    }
}
module.exports = {
    isAdmin
};