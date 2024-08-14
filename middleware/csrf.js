const csurf = require('csurf');
const cookieParser = require('cookie-parser');

// Middleware CSRF
const csrfProtection = csurf({ cookie: true });

// Middleware error handling untuk CSRF
const csrfErrorHandler = (err, req, res, next) => {
    if (err.code === 'EBADCSRFTOKEN') {
        res.status(500);
        res.render('exception/500');
    } else {
        next(err);
    }
};

module.exports = {
    csrfProtection,
    csrfErrorHandler
};
