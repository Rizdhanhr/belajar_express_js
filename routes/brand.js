const express = require("express");
const brandRouter = express.Router();
const brandController = require("../controllers/brandController");


brandRouter.use('/',brandController.brandIndex);


module.exports = brandRouter;