const express = require('express');
const router= express.Router();
const controller = require('../controllers/userController');

router.post('/cadastro', controller.register);
router.post('/login', controller.login);


module.exports = router;