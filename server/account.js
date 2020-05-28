const mongoose = require('mongoose');
const AccountSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    phone:{
        type:String,
        required: true,
        unique: true
    },
    dob:{
        type: Date
    }
    
});

mongoose.model('account',AccountSchema);