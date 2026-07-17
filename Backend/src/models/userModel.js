const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    "username":{
        type:String,
        required:true,
        unique:true
    },
    "email":{
        type:String,
        required:true,
        unique:true
    },
    "password":{
        type:String,
        required:true
    },
    "role":{
        type:String,
        enum:["user","admin"],
        default : "user"
    },
    Bookmarks : {
        type : mongoose.Schema.Types.ObjectId,
    }
});

const userModel = mongoose.model("Users", userSchema);

module.exports = userModel;