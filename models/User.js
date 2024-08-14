const bcrypt = require('bcrypt');
const db = require('../config/db');

class User{
    static getByEmail(email){
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
                if (err) return reject(err);
                if (results.length === 0) return resolve(null); 
                resolve(results[0]);
            });
        });
    }

 
}

module.exports = User;