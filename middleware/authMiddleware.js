function isLoggedIn(req, res, next) {
    console.log("Checking session:", req.session);
    if (req.session.email) {
        return next(); // User is logged in, proceed to the next middleware or route handler
    } else {
        console.log("User not logged in, redirecting to login.");
        res.redirect('/login'); // Redirect to login if not logged in
    }
}

module.exports = {
    isLoggedIn,
};
