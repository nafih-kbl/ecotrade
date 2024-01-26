const userModel = require('../models/userModel');
const userModal=require('../models/userModel');
const asyncHandler=require('express-async-handler');
const {validateMongodbId}=require('../utils/validateMongodbId');
const {generateToken}=require('../config/jwtToken');

const createUser=asyncHandler(async(req,res)=>{
    const email=req.body.email;
    const  findUser= await userModal.findOne({email});
    console.log(findUser);
    try {
        if(!findUser)
        {
            const newUser= await userModal.create(req.body);
            res.json(newUser);
        }
        else{
            throw new Error('the user is already exist');
        }
    } catch (error) {
        throw new Error(error);
    }
});
const googleUser=asyncHandler(async(req,res)=>{
    console.log(req.user);
    res.send('success');
});

const logInUser=asyncHandler(async(req,res)=>{
    const {email}=req.body;
    const findUser=await userModal.findOne({email});
    if(findUser && (await findUser.isPasswordMatched(req.body.password)))
    {
        const token=generateToken(findUser?._id)
        res.cookie("refreshToken",token,{
            httpOnly:true,
            maxAge:72*60*60*1000
        })
        res.json({
                 _id: findUser?._id,
                firstname: findUser?.firstName,
                lasttname: findUser?.lastName,
                email: findUser?.email,
                mobile: findUser?.mobile,
                token: token
        })
    }else{
        throw new Error('invalid credentials')
    }

});

const getAllUser = asyncHandler(async (req, res) => {
    try {
        const allUser = await userModal.find()
        res.json(allUser)
    } catch (error) {
        throw new Error(error)
    }
});
const getSingleUSer = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        validateMongodbId(id);
        const user = await userModal.findById(id)
        res.json(user)
    } catch (error) {
        throw new Error(error)
    }
});
const deleteAuser = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        validateMongodbId(id)
        const deletedUSer = await userModal.findByIdAndDelete(id)
        res.json(deletedUSer)
    } catch (error) {
        throw new Error(error)
    }
});
const updtateUser = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        validateMongodbId(id);  
        const updatedUser = await userModel.findByIdAndUpdate(id,
            {
                firstName: req.body?.firstName,
                lastName: req.body?.lasttName,
                email:     req.body?.email,
                mobile:    req.body?.mobile,
            },{
                new:true
            })
        res.json(updatedUser)
    } catch (error) {
        throw new Error(error)
    }
});
const blockUser=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params;
        validateMongodbId(id);
        const blockUser= await userModal.findByIdAndUpdate(id,
            {
                isblocked:true
            },
            {
                new:true
            })
            res.json(blockUser)
    } catch (error) {
        throw new Error(error)
    }

});
const unblockUser=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params;
        validateMongodbId(id)
        const unblockUser= await userModal.findByIdAndUpdate(id,
            {
                isblocked:false
            },
            {
                new:true
            })
            res.json(unblockUser)
    } catch (error) {
        throw new Error(error)
    }

});
module.exports={
    createUser,
    getAllUser,
    getSingleUSer,
    deleteAuser,
    googleUser,
    updtateUser,
    blockUser,
    unblockUser,
    logInUser
}