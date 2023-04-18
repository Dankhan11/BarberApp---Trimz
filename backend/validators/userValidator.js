// const {check, validationResult} = require('express-validator')


// //User validation result function
// //It is our middleware  
// //If result is not empty will
// //if there is an error 'result will be our error'
// //if result is not empty there is an error 
// //convert result to array and we grab the first index (0)
// //converting it to msg 
// //returning status 422 with the corresponding json data  

// exports.userValidationResult = (req,res,next) =>{
//     const result = validationResult(req);
//     if (!result.isEmpty()){
//         const error = result.array()[0].msg;
//         return res.status(422).json({success:false, error: error})
//     }
//     next()
// }


// //User validation of field data occurs here
// exports.userValidator = [

//      //email validation 
//      check('email')
//      .trim()
//      .not()
//      .isEmpty()
//      .withMessage('Email is required')
//      .isEmail()
//      .withMessage('Please enter a valid email address'),
 



//     //  Checking username with specific fields from the user model 
//     check('userName')
//         .trim()
//         .not()
//         .isEmpty()
//         .withMessage('First name is required')
//         .isLength({min:3, max:20})
//         .withMessage('UserName must be between 3 and 20 characters'),


  
    
//     //password validation 
//     check('password')
//         .trim()
//         .not()
//         .isEmpty()
//         .withMessage('Password cannot be left empty')
//         .isLength({min:7})
//         .withMessage('Password must be 7 characters')


// ];


// //Carry out in front end 
