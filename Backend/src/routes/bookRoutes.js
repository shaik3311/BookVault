const express = require('express');
const {getBooks,postBook,editBook,removeBook,addBookMark,getBookMarks,removeBookMark} = require('../controllers/bookControllers')
const bookRouter = express.Router();
const upload = require('../config/multerConfig');

bookRouter.get('/books',getBooks);
bookRouter.post('/books',
                upload.fields([
                    { name: "pdf", maxCount: 1 },
                    { name: "cover", maxCount: 1 },
                ]),
                postBook);
bookRouter.patch('/books',editBook);
bookRouter.delete('/books',removeBook);

bookRouter.get('/bookmarks',getBookMarks);
bookRouter.post('/bookmarks',addBookMark);
bookRouter.delete('/bookmarks',removeBookMark);

module.exports = bookRouter;