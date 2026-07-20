const imageKit = require('../config/imageKitConfig');
const bookModel = require('../models/bookModel');

// Public Books Routes 
const getBooks = async(req,res)=>{
    
    try{
        const books = await bookModel.find();
        return res.status(200).send({
            message:"All books fetched",
            books:books
        })
    }catch(error){
        return res.status(500).send({
            message:"Internal server error while fetching books"
        })
    }
}

// Admin Routes 
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

    try{
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
            "bookFileId":uploadedPdf.fileId,
            "coverUrl":uploadedCover.url,
            "coverFileId":uploadedCover.fileId
        });

        res.status(200).send({
            message:`The book with title : ${book.title} saved in DB`
        });
    }catch(error){
        res.status(500).send({
            message:"Internal server error while uploading the files",
            error:error.message
        })
    }


}

const removeBook = async(req,res)=>{
    const {bookId} = req.body;

    try{
        const book = await bookModel.findById(bookId);
        if(!book){
            return res.status(404).send({
                message:"Book not found"
            })
        }
        await imageKit.deleteFile(book.bookFileId);
        await imageKit.deleteFile(book.coverFileId);

        await bookModel.findByIdAndDelete(book.id);

        return res.status(200).send({
            message:`Book with title : ${book.title} is deleted`
        })

    }catch(error){
        return res.status(500).send({
            message:"Internal server error"
        })
    }
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
    removeBook,
    addBookMark,
    getBookMarks,
    removeBookMark
}