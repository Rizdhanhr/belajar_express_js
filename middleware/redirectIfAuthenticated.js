const redirectIfAuthenticated = (req, res, next) => {
    // if(req.session && req.session.user){
    //     return res.redirect('/');
    // }
    return next();
}

module.exports = redirectIfAuthenticated;