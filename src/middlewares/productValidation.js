const path = require('path');
const db = require('../database/models');
const { body } = require('express-validator');

const validationsProduct = [
    body('title')
    .notEmpty().withMessage('Debe completar este campo').bail()
    .isLength({ min : 5}).withMessage('El nombre debe tener al menos 5 caracteres'),

    body('price')
    .notEmpty().withMessage('Debe completar este campo').bail(),

    body('description')
    .notEmpty().withMessage('Debe completar este campo').bail()
    .isLength({ min : 20}).withMessage('La descripcion debe tener al menos 20 caracteres'),

    body('imgProductos').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif','bmp','.jfif','.tiff', '.jpeg'];
		
		if (!file) {
			throw new Error('Debe subir una imagen');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}
		return true;
	})
]

module.exports = validationsProduct;