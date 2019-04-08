const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();

//Lets say the route below is very sensitive and we want only authorized users to have access

//Displays information tailored according to the logged in user
router.get('/profile', (req, res, next) => {
  //We'll just send back the user details and the token
  //req.user contains the ObjectID for current user
  //console.log(req.user);

  let token = jwt.sign({
    userId : req.user ,
    exp : Math.floor(Date.now() / 1000) + (60),
  },process.env.EXPRESS_SECRET);
  //Send back the token to the user
  token = 'Bearer ' + token;


  res.json({
    message : 'You made it to the secure route',
    token : token
  })
});

module.exports = router;
