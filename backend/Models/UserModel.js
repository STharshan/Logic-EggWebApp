const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    employeeId:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        name: String,
        data: Buffer,
        contentType: String,
    }
});

const employee = mongoose.model("employee",employeeSchema)
module.exports = employee