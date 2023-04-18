//VALIDATION
const Joi = require('@hapi/joi') 


//Register Validation

const registerValidation = data =>{//data for register validation 
    const schema  = Joi.object({
        name: Joi.string().min(6).required(),//has to be string minimum 6 characters and is required
        email: Joi.string().min(6).required().email(),//same as above but required email format
        password: Joi.string().min(6).required()//same requirements as name 
    
    })
     return schema.validate(data)
}

module.exports.registerValidation = registerValidation;

//Login validation  
//Same schema as used before 
const loginValidation = data =>{
    const schema  = Joi.object({//schema is an object
        name: Joi.string().min(6).required(),//has to be string minimum 6 characters and is required
        email: Joi.string().min(6).required().email(),//same as above but required email format
        password: Joi.string().min(6).required()//same requirements as name 
    
    })
     return schema.validate(data)
}
    
module.exports.loginValidation = loginValidation;