const dotenv = require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/authRoutes');

const connectDB = require('./config/dbConfig');

const app = express();
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes)

app.listen(process.env.PORT, ()=>{
    console.log(`Server running on http://localhost:3000`);
})