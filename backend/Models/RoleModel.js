const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    rolename:{
        type:String,
        required:true
    }
});

const role = mongoose.model("role", roleSchema);

module.exports = role;