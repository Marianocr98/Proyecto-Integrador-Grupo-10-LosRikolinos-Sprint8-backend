const express = require('express');
const router = express.Router();
const categoriesController = require('../../controllers/api/categoriesController');

//ver lista de todos los productos
router.get('/', categoriesController.list);



module.exports = router;