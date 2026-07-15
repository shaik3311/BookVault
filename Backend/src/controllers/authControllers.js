const { default: mongoose } = require('mongoose');
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

const register = async(req,res)=>{
    const {username,email,password} = req.body;
    if(!username || !email || !password){
        return res.status(400).send({
            "message":"All the fields are mandatory"
        });
    }

    try{
        const hashedPass = await bcrypt.hash(password,10);
        const user = await userModel.create({
            username,
            email,
            "password":hashedPass
        });
        res.status(201).send({
            message:`User with username : ${user.username} registered go login pages to access the content`
        })
    }catch(error){
        res.status(500).send({
            message:"Server error while registering the user",
            error:error
        })
    }
}
const login = async(req,res)=>{
    const {email,password} = req.body;

    if(!email || !password){
        return res.status(400).send({
            message : "Provide all the credentials"
        })
    }

    try{
        const user = await userModel.findOne({email});
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).send({
                message:"Invalid Credentials"
            })
        }
        res.status(200).send({
            message:`User with username : ${user.username} logged in successfully`
        })
    }catch(error){
        res.status(500).send({
            "message":"Internal server error",
            "error":error
        })
    }
}

module.exports = {
    register,
    login
}

