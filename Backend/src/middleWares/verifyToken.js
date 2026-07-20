const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')

const verifyToken = async(req,res,next)=>{
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

    req.user = user;
    next();
}

module.exports = verifyToken;