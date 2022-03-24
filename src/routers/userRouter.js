const express = require('express');
const router = express.Router();
const {body} = require('express-validator');



//Requiero userController
const userController = require('../controllers/userController');


//REQUIRIENDO Middlewares 
const logRegisterMiddleware = require('../middlewares/logRegisterMiddleware');
const multerUpFile = require('../middlewares/multerMiddleware');
const validations = require('../middlewares/validationForm');
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');

//RUTAS HACIA EL CONTROLLER

router.get('/register', guestMiddleware, userController.register);

router.get('/login', guestMiddleware, userController.login);

router.post('/register', multerUpFile.single('avatar'), logRegisterMiddleware, validations , userController.processRegister);

router.post('/login', userController.processLogin);

router.get('/profile', authMiddleware, userController.profile);

router.get('/profile/edit/:id', userController.edit);

router.put('/profile/edit/:id', multerUpFile.single('avatar'), userController.update);


router.get('/logout/', userController.logout);


module.exports = router;