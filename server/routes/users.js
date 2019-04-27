const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const passport = require('passport')

//Lets say the route below is very sensitive and we want only authorized users to have access

//Displays information tailored according to the logged in user
router.get('/dashboard',passport.authenticate('jwt', { session : false }),userController.validate, userController.dashboard);

router.get('/handles',passport.authenticate('jwt', { session : false }),userController.validate, userController.getHandles);

router.post('/handles',passport.authenticate('jwt', { session : false }),userController.validate, userController.addHandles);

router.get('/logout',passport.authenticate('jwt', { session : false }),userController.validate, userController.logout);

router.get('/fetch' ,passport.authenticate('jwt', { session : false }),userController.validate, userController.fetchSubmissions);

router.get('/:username',userController.displayUser);
module.exports = router;
