const router = require('express').Router();
const verify = require('./tokenVerification')

router.get('/',verify ,(req,res) =>{
    res.send('HELLO this is a private route')
    userName = (req.body.name)
    res.send(userName)
})



module.exports = router;