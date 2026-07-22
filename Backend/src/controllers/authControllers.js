const { default: mongoose } = require('mongoose');
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
        if(!user){
            return res.status(404).send({
                message:"User not found"
            })
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).send({
                message:"Invalid Credentials"
            })
        }
        const access_Token = await jwt.sign({
            "id":user._id,
            "role":"user"
        },process.env.JWT_SECRET_KEY,{
            expiresIn : "15m"
        });
        const refresh_Token = await jwt.sign({
            "id":user._id
        },process.env.JWT_SECRET_KEY,{
            expiresIn : "7d"
        })
        res.cookie("refreshToken", refresh_Token, {
            httpOnly: true,
            secure: true,        // true in production with HTTPS
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        res.status(200).send({
            message:`User with username : ${user.username} logged in successfully`,
            "AccessToken":access_Token
        })
    }catch(error){
        res.status(500).send({
            "message":"Internal server error",
            "error":error
        })
    }
}

const refresh = async(req,res)=>{
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken){
        res.status(401).send({
            message:"Refresh Token not found at refresh route"
        })
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
    const user = await userModel.findById(decoded.id);
    const access_Token = await jwt.sign({
        "id":user._id,
        "role":"user"
    },process.env.JWT_SECRET_KEY,{
        expiresIn : "15m"
    });
    const refresh_Token = await jwt.sign({
        "id":user._id
    },process.env.JWT_SECRET_KEY,{
        expiresIn : "7d"
    });

    res.cookie("refreshToken",refresh_Token,{
        httpOnly:true,
        secure:true,
        sameSite:"Strict",
        maxAge:7*24*60*60*1000
    });
    res.status(200).send({
        message:"new access_Token generated",
        "access_Token" : access_Token
    }); 

}

const getInfo = async(req,res)=>{
    const header = req.headers;
    if(!header){
        return res.status(401).send({
            message:"Authorization header not found"
        });
    }
    const accessToken = header.authorization.split(" ")[1];
    if(!accessToken){
        return res.status(401).send({
            message:"AccessToken not found"
        })
    }
    const decoded = await jwt.verify(accessToken,process.env.JWT_SECRET_KEY);
    const user = await userModel.findById(decoded.id);
    res.status(200).send({
        message:"User fetched successfully",
        "user":user
    })
}

const checkUsername = async(req,res)=>{
    const {username} = req.params;

    try{
        const user = await userModel.findOne({username});
        if(user){
            return res.status(200).status({
                message:"Username already exists",
                availability : false
            })
        }
    }catch(error){
            
    }
}

module.exports = {
    register,
    login,
    refresh,
    getInfo,
    checkUsername
}

