// const router = require('express').Router();
// const user = require('../models/users');
// const {signupUser, signInUser, signOut} = require('../controllers/signupControl')
// //check method imported for user validation
// const {check} = require('express-validator');
// const { userValidator, userValidationResult } = require('../validators/userValidator');
// const {isAuth} = require('../middleware/auth')


// //post send data through http request front end to backend 
// router.post('/signup',userValidator, userValidationResult, signupUser)

// router.post('/signin',signInUser)
// module.exports = router;


// //rndm 
// router.get('/secret', isAuth, (req,res) =>{
//     console.log(req.user)
//     res.json({success:true, message:'you are in secret page'})
// })
// //creation of sign up route
// router.get('/signout',signOut)


// //middleware is stuff which runs bertween the request being sent and the response being run to the server


// //check if email already exists within the databse
// exports.signupUser = async (req,res)=>{
//     const User = await user.findOne({email:req.body.email})
//     if(User){
//         return res.status(400).json({success:false , error: 'email is already in use '})
//     }
//      const newUser = new user(req.body)
//      await newUser.save()

//      res.status(201).json({success:true,user })


    
// }
