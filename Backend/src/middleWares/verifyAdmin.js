

const verifyAdmin = async(req,res,next)=>{
    const user = req.user;

    if(user.role!="admin"){
        return res.status(401).send({
            message:"Forbidden route"
        })
    }
    next();
}

module.exports = verifyAdmin;