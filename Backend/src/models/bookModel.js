const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    "title":{
        type:String,
        required:true,
        unique:true
    },
    "category":{
        type:String,
        required:true
    },
    "description":{
        type:String,
        required:true
    },
    "bookUrl":{
        type:String,
        required:true
    },
    "coverUrl":{
        type:String,
        required:true
    }
});

const bookModel = mongoose.model("books",bookSchema);

module.exports = bookModel;