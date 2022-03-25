const express = require('express');
const router = express.Router();
const userController = require('../../controllers/api/userController');

//ver lista de todos los usuarios
router.get('/', userController.list);
//ver usuario por id
router.get('/:id', userController.show);

module.exports = router;