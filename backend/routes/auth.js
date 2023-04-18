const router = require('express').Router();
const User = require('../models/users')
const {loginValidation , registerValidation} = require('../validation')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
//Creation of new user using the user model
router.post('/register', async (req,res)=>{

    //Validating the data before we make a user
       const {error} = registerValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        //Checking if the user already exists
        const emailExist = await User.findOne({email:req.body.email})
        //if the email does exist will return a 400 error to the server
        //Outputting the message contained within the.send()
        if(emailExist) return res.status(400).send('Email already exits');

        //Hash passwords
        //gen salt determines complexity of string generated 
        //hash the password using the salt 
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password , salt);
        //hashed password added to databse instead of req.body
        //creation of a new user
     const user = new User({
         name: req.body.name,
         email:req.body.email,
         password:hashedPassword,
     })
     try{
         const savedUser = await user.save();
         res.send(savedUser);
     }catch(err){
         res.status(400).send(err)
     }
});


//LOGIN
  
router.post('/login', async(req,res)=>{

    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    //Checking if the user already exists
    const userExist = await User.findOne({email:req.body.email})
    //if the email does exist will return a 400 error to the server
    //Outputting the message contained within the.send()
    if(!userExist) return res.status(400).send('Email does not exist');
    //Checking if the password is correct 
    const validPassword = await bcrypt.compare(req.body.password ,userExist.password)
    if(!validPassword) return res.status(400).send('Invalid password')
    //creating and assigning a token
    const token = jwt.sign({_id: userExist._id},process.env.JWT_SECRET)
    //Adding token to our header
    res.header('auth-token').send(token)
   


})


module.exports = router;