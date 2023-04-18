const mongoose = require('mongoose')


const client = new mongoose.Schema({
    Username:String,
    Password:String,
    
});

module.exports = mongoose.model("Client",client)