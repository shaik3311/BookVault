const express = require('express');
const {getBooks,postBook,editBook,removeBook,addBookMark,getBookMarks,removeBookMark} = require('../controllers/bookControllers');
const verifyToken = require('../middleWares/verifyToken');
const verifyAdmin = require('../middleWares/verifyAdmin');
const bookRouter = express.Router();
const upload = require('../config/multerConfig');

// Public Routes 
bookRouter.get('/books',getBooks);
// Admin Routes 
bookRouter.post('/books',
                verifyToken,verifyAdmin,
                upload.fields([
                    { name: "pdf", maxCount: 1 },
                    { name: "cover", maxCount: 1 },
                ]),
                postBook);
bookRouter.delete('/books',verifyToken,verifyAdmin,removeBook);

// User Routes 
bookRouter.get('/bookmarks',verifyToken,getBookMarks);
bookRouter.post('/bookmarks',verifyToken,addBookMark);
bookRouter.delete('/bookmarks',verifyToken,removeBookMark);

module.exports = bookRouter;