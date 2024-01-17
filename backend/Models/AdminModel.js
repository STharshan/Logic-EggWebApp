const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    employeeId:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

const collection = mongoose.model("collection",userSchema)
module.exports = collection