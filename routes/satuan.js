const express = require('express');
const satuanRouter = express.Router();
const satuanController = require('../controllers/satuanController');
const validateSatuan = require('../validator/satuanValidator');


satuanRouter.get('/', satuanController.satuanIndex);
satuanRouter.get('/create', satuanController.satuanCreate);
satuanRouter.post('/', validateSatuan.satuanCreateValidator, satuanController.satuanStore);
satuanRouter.get('/edit/:id', satuanController.satuanEdit);
satuanRouter.post('/update/:id', validateSatuan.satuanEditValidator, satuanController.satuanUpdate);
module.exports = satuanRouter;