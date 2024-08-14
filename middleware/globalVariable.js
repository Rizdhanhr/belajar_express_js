const globalVariable = (req, res, next) => {
    res.locals.currentRoute = req.originalUrl;
    res.locals.currentUser = req.session.user || null;
    res.locals.csrf = req.csrfToken();
    next();
}

module.exports = globalVariable;