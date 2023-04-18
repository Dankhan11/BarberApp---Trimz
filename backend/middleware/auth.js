const JWT = require('jsonwebtoken')
const user = require('../models/users')

exports.isAuth = async (req,res,next) => {
    const isValid = await verifyToken(req)

    if (!isValid){
        return res.status(401).json({success:false , error:'user not found '})
    }

    req.user = isValid 
    
    next()
}

//Variable: is valid 

const verifyToken = async (req) => {
    if(!req.cookies.auth_token){
        return false
    }
    const decode = JWT.verify(req.cookies.auth_token, process.env.JWT_SECRET);
    const User = await user.findOne({_id: decode._id})
    
    if (!User){
        return false
    }
    return User 
}