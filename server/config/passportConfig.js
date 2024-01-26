const passport=require('passport');
const googleStrategy=require('passport-google-oauth2').Strategy;
const asyncHandler=require('express-async-handler');
const userModal=require('../models/userModel');


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(asyncHandler(async(id, done) => {
  const user=await userModal.findOne({id});
  done(null,user)
 
 }));

const authUser = asyncHandler(async(request, accessToken, refreshToken, profile, done) => {
  const user= await userModal.findOne({google_id:profile.id});
  if(!user)
  {
    const newUser=await new userModal({
      google_id:profile.id,
      firstName:profile.displayName,
      email:profile.emails[0].value,
      password:'samplepassword'
    });
    newUser.save();
    return done(null,newUser);
  }else{
    return done(null, user);
  }
  // console.log(accessToken);
   
  })
  passport.use(new googleStrategy({ 
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/user/auth/google/callback",
    passReqToCallback   : true
  }, authUser));

 


4
