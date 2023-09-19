const jwt = require('jsonwebtoken')
const User = require("../Models/userModel");

// just commentout to add all the images in the createApi carefully otherwise it cause errors

exports.isAuthenticatedUser = async(req,res,next)=>{
    const {token} = req.cookies
    
    // just commentout to add all the images in the createApi carefully otherwise it cause errors

    if(!token){
        return res.status(401).json({message:'Please login to access this page'})
    }

    try{
        const decodedData = jwt.verify(token,process.env.JWT_SECRETKEY)
        req.user = await User.findById(decodedData._id)
        next()
    }catch(err){
        res.status(400).json({message:'Invalid token'})
    }
}