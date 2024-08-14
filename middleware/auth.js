const checkAuth = (req, res, next) => {
    next();
    // if(req.session && req.session.user){
    //     return next();
    // }
    // return res.redirect('/login');
}

module.exports = checkAuth;