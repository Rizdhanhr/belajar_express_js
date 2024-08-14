const globalMessage = (req, res, next) => {
    res.locals.successMessage = req.flash('successMessage')[0] || '';
    res.locals.errorMessage = req.flash('errorMessage')[0] || '';
    res.locals.errors = req.flash('errors')[0] || {};
    res.locals.oldInput = req.flash('oldInput')[0] || {};
    next();
}

module.exports = globalMessage;