const express = require('express');
const {getBooks,postBook,editBook,removeBook,addBookMark,getBookMarks,removeBookMark} = require('../controllers/bookControllers');
const verifyToken = require('../middleWares/verifyToken');
const verifyAdmin = require('../middleWares/verifyAdmin');
const bookRouter = express.Router();
const upload = require('../config/multerConfig');

bookRouter.get('/books',getBooks);
bookRouter.post('/books',
                verifyToken,verifyAdmin,
                upload.fields([
                    { name: "pdf", maxCount: 1 },
                    { name: "cover", maxCount: 1 },
                ]),
                postBook);
bookRouter.patch('/books',verifyToken,verifyAdmin,editBook);
bookRouter.delete('/books',verifyToken,verifyAdmin,removeBook);

bookRouter.get('/bookmarks',getBookMarks);
bookRouter.post('/bookmarks',addBookMark);
bookRouter.delete('/bookmarks',removeBookMark);

module.exports = bookRouter;