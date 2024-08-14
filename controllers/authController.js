const { body, validationResult } = require('express-validator');
const session = require('express-session');
const User = require("../models/User");
const bcrypt = require('bcryptjs');

class authController {

    static loginIndex(req, res){
        res.render("auth/login",{title : "Login"});
    }
    
    static async loginPost(req, res){
        try{
            const errors = validationResult(req);
            req.flash('oldInput', req.body);
            if (!errors.isEmpty()) {
                const errorMessage = errors.array().reduce((acc, error) => {
                    if(!acc[error.path]){
                        acc[error.path] = error.msg; 
                    }
                    return acc;
                }, {});
                req.flash('errors', errorMessage);
                return res.redirect('/login');
            }
            const{email, password} = req.body;
            const user = await User.getByEmail(email);
            const isMatch = await bcrypt.compare(password, user.password);
            if(!user || !isMatch){
                let message = {'email' : "These credentials doesn't match our records."};
                req.flash('errors', message);
                return res.redirect('/login');
            }

            req.session.user = {
                id: user.id,
                name : user.name,
                email: user.email,
                role : user.role_id
            };

            req.flash('successMessage', 'Data Saved');
            return res.redirect('/');
        }catch(err){
            console.log(err);
            req.flash('errorMessage', 'Server Error');
            res.redirect('/');
        }
        
    }
    
    static logout(req, res){
        req.session.destroy((err) => {
            if (err) {
              return res.render('exception/500');
            }
            // Arahkan pengguna ke halaman login atau halaman utama setelah logout
             return res.redirect('/login'); // Ganti '/login' dengan route yang sesuai
          });
    }
    

}

module.exports = authController;