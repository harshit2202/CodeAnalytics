const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../models/UserModel');

//Create a passport middleware to handle user registration
passport.use('signup', new localStrategy({
  usernameField : 'email',
  passwordField : 'password'
}, async (email, password, done) => {
    try {
      
      
      //Check if user already exists
      var user = await UserModel.findOne({ email : email });
      if(user) {
        //console.log(user);
        //console.log("User Already Exists!");
        return done(null,false, { message : 'Email already used!'});
      }
      
      
      //Save the information provided by the user to the the database
      user = await UserModel.create({ email, password });
      //Send the user information to the next middleware
      return done(null, user);
    } catch (error) {
      done(error);
    }
}));

//Create a passport middleware to handle User login
passport.use('login', new localStrategy({
  usernameField : 'email',
  passwordField : 'password'
}, async (email, password, done) => {
  try {
    //Find the user associated with the email provided by the user
    const user = await UserModel.findOne({ email });
    if( !user ){
      //If the user isn't found in the database, return a message
      return done(null, false, { message : 'User not found'});
    }
    //Validate password and make sure it matches with the corresponding hash stored in the database
    //If the passwords match, it returns a value of true.
    const validate = await user.isValidPassword(password);
    if( !validate ){
      return done(null, false, { message : 'Wrong Password'});
    }
    //Send the user information to the next middleware
    return done(null, user, { message : 'Logged in Successfully'});
  } catch (error) {
    return done(error);
  }
}));

const JWTstrategy = require('passport-jwt').Strategy;
//We use this to extract the JWT sent by the user
const ExtractJWT = require('passport-jwt').ExtractJwt;

//console.log('HERE!!!!!! ' + process.env.EXPRESS_SECRET);
//This verifies that the token sent by the user is valid
passport.use(new JWTstrategy({
  //secret we used to sign our JWT
  secretOrKey : process.env.EXPRESS_SECRET,
  //get the token as Bearer token from Authorization Header
  jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken()
}, async (token, done) => {
  try {
    //console.log(token);  
    //Pass the user details to the next middleware
    return done(null, token.user);
  } catch (error) {
    done(error);
  }
}));