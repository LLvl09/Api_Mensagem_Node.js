const express = require('express');
const router= express.Router();
const controller = require('../controllers/mensagemController');
const checkToken = require('../services/checkToken');


router.post('/enviarMensagem/:id',checkToken.check, controller.post);
router.get('/mensagens/:id', checkToken.check, controller.get);

module.exports = router;