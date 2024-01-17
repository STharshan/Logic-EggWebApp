const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    devicename:{
        type:String,
        required:true
    },
    deviceId:{
        type:String,
        required:true
    }
});

const device = mongoose.model("device", deviceSchema);

module.exports = device;