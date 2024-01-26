const jwt=require('jsonwebtoken');
const userModal=require('../models/userModel');
const asyncHandler=require('express-async-handler')


const authMiddleware=asyncHandler(async(req,res,next)=>{
    let token;
    if(req?.headers?.authorization?.startsWith('Bearer')){
        token=req.headers.authorization.split(" ")[1];
        try {
            const decoded=jwt.verify(token,process.env.JWT_SECRET)
            const verifyUser=await user.findById(decoded?.id);
            req.user=verifyUser;
            next();
        } catch (error) {
            throw new Error("Not autherised TOken Expired Please Login Again")
        }
    }else{
        throw new Error("Not autherised TOken Expired Please Login Again")
    }
    
});

module.exports={
    authMiddleware
}