const express = require('express');
const passport = require('passport');
const userController = require('../controllers/userController');

const router = express.Router();


router.post('/signup' , function (req , res , next) {
  passport.authenticate('signup', function(err , user , info) {

    if(err) {
      
      if(err.code == 11000) {
        res.statusCode = 409;
        return res.json( { error : "Username or Email already exists!"});
      }
      else
        return next(err);
    }
    else
      return res.redirect(307 , '/auth/login');

  })(req , res , next);
});

router.post('/login', async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {     
        

        if(!user)
          return res.json( {error : 'Invalid username or password!'});

        else if(err)
          return next(err);

        else {
          req.user = user._id;
          return await userController.dashboard(req,res);
        }
    })(req, res, next);
  });
  
  module.exports = router;