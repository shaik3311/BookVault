const dotenv = require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const bookRouter = require('./routes/bookRoutes');

const connectDB = require('./config/dbConfig');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRouter);

app.listen(process.env.PORT, ()=>{
    console.log(`Server running on http://localhost:3000`);
})