const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

//Lets say the route below is very sensitive and we want only authorized users to have access

//Displays information tailored according to the logged in user
router.get('/dashboard',userController.validate, userController.dashboard);

router.get('/handles' ,userController.validate, userController.getHandles);

router.post('/handles' ,userController.validate, userController.addHandles);

router.get('/logout' ,userController.validate, userController.logout);

module.exports = router;
