const express = require('express');
const bcrypt = require('bcryptjs');
const appError = require('../service/appError'); 
const jwt = require('jsonwebtoken');
const handleErrorAsync = require('../service/handleErrorAsync');
const validator = require('validator');
const User = require('../models/usersModel');
const {isAuth,generateSendJWT} = require('../service/auth');
const router = express.Router();

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth20' ).Strategy;
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_AUTH_CLIENTID,
  clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
  callbackURL: "http://localhost:3010/users/google/callback"
},
async function(accessToken, refreshToken, profile, cb) {
  console.log("測試")
  console.log(profile)
  try {
    const user = await User.findOrCreate(
      {
        googleId: profile.id,
        name: profile.displayName, 
        email: profile.emails[0].value,
      }
    );
    return cb(null, user);
  } catch (err) {
    return cb(err);
  }
}
));

router.post('/sign_up', handleErrorAsync(async(req, res, next) =>{
  let { email, password,confirmPassword,name } = req.body;
  // 內容不可為空
  if(!email||!password||!confirmPassword||!name){
    return next(appError("400","欄位未填寫正確！",next));
  }
  // 密碼正確
  if(password!==confirmPassword){
    return next(appError("400","密碼不一致！",next));
  }
  // 密碼 8 碼以上
  if(!validator.isLength(password,{min:8})){
    return next(appError("400","密碼字數低於 8 碼",next));
  }
  // 是否為 Email
  if(!validator.isEmail(email)){
    return next(appError("400","Email 格式不正確",next));
  }
  
  // 加密密碼
  password = await bcrypt.hash(req.body.password,12);
  const newUser = await User.create({
    email,
    password,
    name
  });
  generateSendJWT(newUser,201,res);
}))

router.post('/sign_in',handleErrorAsync(async(req,res,next)=>{
  const { email, password } = req.body;
  if (!email || !password) {
    return next(appError( 400,'帳號密碼不可為空',next));
  }
  const user = await User.findOne({ email }).select('+password');
  const auth = await bcrypt.compare(password, user.password);
  if(!auth){
    return next(appError(400,'您的密碼不正確',next));
  }
  generateSendJWT(user,200,res);
}))

router.get('/profile/',isAuth, handleErrorAsync(async(req, res, next) =>{

  res.status(200).json({
    status: 'success',
    user: req.user
  });
}))

router.post('/updatePassword',isAuth,handleErrorAsync(async(req,res,next)=>{
  
  const {password,confirmPassword } = req.body;
  if(password!==confirmPassword){
    return next(appError("400","密碼不一致！",next));
  }
  newPassword = await bcrypt.hash(password,12);
  
  const user = await User.findByIdAndUpdate(req.user.id,{
    password:newPassword
  });
  generateSendJWT(user,200,res)
}))

router.get('/google', passport.authenticate('google', {
  scope: [ 'email', 'profile'],
}));

router.get('/google/callback', passport.authenticate('google', { session: false }), handleErrorAsync(async(req,res,next)=> {
  const user = await User.findById(req.user.id);
  generateSendJWT(user,200,res)
}))

router.post('/googleClient/callback', passport.authenticate('google', { session: false }), handleErrorAsync(async(req,res,next)=> {
  const user = await User.findById(req.user.id);
  generateSendJWT(user,200,res)
}))
module.exports = router;
