const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    experience:{
        type:Number,
    },
    tags:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Tag"
    }],
    workFromHome:{
        type:Boolean,
        default: false,
    },
    openToWoek:{
        type:Boolean,
        default:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    phone:{
        type: String,
    },
    gender:{
        type:String,
        enum:["Male, Female, Other"]
    }
});

module.exports = mongoose.model("Profile", profileSchema);
