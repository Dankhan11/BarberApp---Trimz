// const user = require('../models/users')
// const JWT = require('jsonwebtoken')
// require('dotenv').config()

// //passing userid from sign in user function 
// const signToken = (userId) =>{
//     return JWT.sign({_id:userId},process.env.JWT_SECRET)
// }

// //sign up user function 
// exports.signupUser = async (req,res) =>{
//     const User = await user.findOne({email: req.body.email})
//     try{
//     if (User){
//         return res.status(400).json({success: false , error:'This is email is already in use try sign in '})
//     }
//     const newUser = new user(req.body);
//     const{ userName, email ,role} = newUser
//     await newUser.save()
//     //Creating a token upon sign up for the user so user can sign up and sign in at one time
//     const token = signToken(newUser._id);
//     res.cookie('auth_token', token,{
//        httpOnly: true,
//     });


//     res.status(201).json({success:true, user: newUser})
// }catch(error){
//     res.status(500).json({success:false, error:'An error has occurred'})
//     console.log(error)
// }
// }

// //sign in user function 
// exports.signInUser= async (req,res) => {
//     const{email,password, userName, role} = req.body
//     try{

    
//     const User = await user.findOne({email});
// //if the user cannor be found 401 error sent to backend with the following json data 
//     if(!User){
//         return res.status(401).json({success:false, error:'user not found try signing up'})
//     }
//     //isMatch variable used compare password function is called to see if the password matches 
//  const isMatch = await User.comparePassword(password)
//  if (!isMatch){
//      return res.status(401).json({success:false, error:'email/password does not match '})
//  }
//  //creating a cookie with the name 'auth_token'
//  //If anyone tries to 'res' the cookie it will not work because it only works with the http request
//     const token = signToken(user._id);
//     res.cookie('auth_token', token,{
//        httpOnly: true,
//     });
//     const newUser = {userName, role };
//     res.json({success:true,user:{userName,role}})
// }catch(error){
//     res.status(500).json({success:false, error:'An error has occurred'})
// }
// }


// exports.signOut = (req,res) =>{
//     res.clearCookie('auth_token')
//     res.json({success:true, message:'Sign out functionality'})
// }


//Variables created: isMatch , user , 
//functions used: compare password from users model
//signout function 