function isLoggedIn(req, res, next) {
    
    if (req.session.isActive) {
        return next(); // User is logged in, proceed to the next middleware or route handler
    } else {
        console.log("User not logged in, redirecting to login.");
        res.redirect('/login'); // Redirect to login if not logged in
    }
}

module.exports = {
    isLoggedIn
};
