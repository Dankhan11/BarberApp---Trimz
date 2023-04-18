const jwt = require('jsonwebtoken')

//middleware function 
module.exports =  function(req,res,next){

    //Checking the name of the token to be auth-token
    const token = req.header('auth-token');
    //If it does not exist then access will be denied 
    if(!token) return res.status(400).send('Access denied')
    //If it is correct then we will try to verify it as shown below
    try{
        //Passing in token along with the secret 
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified;
        next()
    }catch(err){
        //If not verified we send a invalid token 
        res.status(400).send('Invalid token')
    }

}