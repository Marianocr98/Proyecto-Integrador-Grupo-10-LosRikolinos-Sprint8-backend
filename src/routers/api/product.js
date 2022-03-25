const express = require('express');
const router = express.Router();
const productController = require('../../controllers/api/productController');

//ver lista de todos los productos
router.get('/', productController.list);
//ver lista de productos por categoria
router.get('/category/:id', productController.listByCategory);
//ver producto por id
router.get('/:id', productController.show);

module.exports = router;