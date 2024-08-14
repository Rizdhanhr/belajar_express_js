const { body } = require('express-validator');

// Middleware validasi
const satuanCreateValidator = [
    body('name').notEmpty().withMessage('The name field is required.').isLength({ min: 2, max:255 }),
];

const satuanEditValidator = [
    body('name').notEmpty().withMessage('The name field is required.').isLength({ min: 2, max:255 }),
];

module.exports = {
    satuanCreateValidator,
    satuanEditValidator
} ;
