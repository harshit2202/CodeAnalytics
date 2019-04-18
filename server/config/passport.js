const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../models/UserModel');
const HandleModel = require('../models/HandleModel');

//Create a passport middleware to handle user registration
passport.use('signup', new localStrategy({
  passReqToCallback : true,
}, async (req , username, password, done) => {
    try {
      
      const firstName = req.body.firstName;
      const lastName  = req.body.lastName;
      const email     = req.body.email;
      //Save the information provided by the user to the the database
      
      user = await UserModel.create({ firstName , lastName  , username , email , password , isLoggedIn : true });
      await HandleModel.create({
        userId : user._id,
        codeforcesHandle : null,
        codechefHandle : null,
        hackerearthHandle : null
      });
      //Send the user information to the next middleware
      return done(null, user);
    } catch (error) {
      done(error);
    }
}));

//Create a passport middleware to handle User login
passport.use('login', new localStrategy({
}, async (username, password, done) => {
  try {
    //Find the user associated with the username provided by the user
    var user = await UserModel.findOne({ username });
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

    if(user.isLoggedIn != true) {
      await UserModel.updateOne({ _id : user._id} , { isLoggedIn : true });
    }
    user.isLoggedIn = true;
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
    //Pass the user details to the next middleware
    //console.log(done.name);
    return done(null, token.userId);
  } catch (error) {
    done(error);
  }
}));