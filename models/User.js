const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    account:{
        type: String,
        enum: ["admin", "student", "job", "tester"],
        required: true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model("User", userSchema);
