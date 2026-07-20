const imageKit = require('../config/imageKitConfig');
const bookModel = require('../models/bookModel');
// Books Routes 
const getBooks = async(req,res)=>{
    
}
const postBook = async(req,res)=>{
    const {title,category,desc} = req.body;
    if(!title || !category || !desc){
        return res.status(400).send({
            message:"Enter all the fields"
        });
    }
    const pdf = req.files.pdf?.[0];
    const cover = req.files.cover?.[0];
    if(!pdf || !cover){
        return res.status(400).json({
            message:"PDF and cover are required"
        })
    }

    const uploadedCover = await imageKit.upload({
        file: cover.buffer,
        fileName: title,
        folder: "/book-covers",
    }); 
    const uploadedPdf = await imageKit.upload({
        file: pdf.buffer,
        fileName: title,
        folder: "/books",
    });

    const book = await bookModel.create({
        title,
        "category":category,
        "description":desc,
        "bookUrl":uploadedPdf.url,
        "coverUrl":uploadedCover.url
    });

    res.status(200).send({
        message:`The book with title : ${book.title} saved in DB`
    });


}

const editBook = async(req,res)=>{

}
const removeBook = async(req,res)=>{

}

// BookMark Routes 
const addBookMark = async(req,res)=>{

}
const getBookMarks = async(req,res)=>{

}
const removeBookMark = async(req,res)=>{

}

module.exports = {
    getBooks,
    postBook,
    editBook,
    removeBook,
    addBookMark,
    getBookMarks,
    removeBookMark
}