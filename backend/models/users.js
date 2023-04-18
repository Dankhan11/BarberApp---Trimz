const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//creating schema model to go into database (how to store data)
const userSchema = new mongoose.Schema({
    name:{
        type : String,
        required:false,
        minlength:3,
        maxlength:20,
        trim:true,
    },
    email:{
        type : String,
        required:true,
        trim:true,
        max:255,
        min:6,
        unique:true,
    },
    password:{
        type : String,
        required : true,
        minlength : 7, 
        max:1024
    },
    date:{
        type:Date,
        default:Date.now
    }
    

});


// //checking if the password is modified 
// user.pre('save', function (next){
//     if(!this.isModified('password')){
//         return next()
//     }
// // if there are errors then return next function 
// // if error does not exist sets password as hashed password
//     bcrypt.hash(this.password , 10, (err, hashedPassword) =>{
//         if(err) return next(err)
//             this.password = hashedPassword;
//             next()
        
//     })
// })

// user.methods.comparePassword = function(password){
//     if(password){
//         return bcrypt.compare(password, this.password)
//     }
//     return false;
// }


module.exports = mongoose.model("Customers",userSchema);


