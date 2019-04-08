const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();


router.post('/signup' , function (req , res , next) {
  passport.authenticate('signup', function(err , user , info) {
    if(err) {
      console.log(err.errmsg);
      return next(err);
    }
    
    return res.redirect(307 , '/auth/login');

  })(req , res , next);
});

router.post('/login', async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {     try {
        if(err || !user){
          const error = new Error('An Error occurred')

          return next(error);
        }
        req.login(user, { session : false }, async (error) => {
          if( error ) return next(error)
          //We don't want to store the sensitive information such as the
          //user password in the token so we pick only the email and id
          //Sign the JWT token and populate the payload with the user id
          let token = jwt.sign({
            userId : user._id ,
            exp : Math.floor(Date.now() / 1000) + (60),
          },process.env.EXPRESS_SECRET);
          //Send back the token to the user
          token = 'Bearer ' + token;
          return res.json({ token });
        });     } catch (error) {
        return next(error);
      }
    })(req, res, next);
  });
  
  module.exports = router;