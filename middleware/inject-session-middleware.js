// Middleware to pass session data to all views
function injectSession(req, res, next) {
    res.locals.session = req.session; // Makes the session data accessible in all EJS files
    next(); // Proceed to the next middleware or route
}

module.exports = {
    injectSession
};
