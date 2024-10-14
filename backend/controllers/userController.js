
import asyncHandler from "../middleware/asyncHandler.js";
import User from '../models/userModel.js';


export const authUser = asyncHandler (async (req, res) =>{
    const {email , password} = req.body;

    const user = await User.findOne({
        email: email
    })
    if(user && (await user.matchPassword(password))){
        res.json({
            _id:user._id,
            name: user.name,
            email:user.email,
            isAdmin: user.isAdmin
        })
    }else{
        res.status(401);
        throw new Error('Invalid email or password!')
    }
    

});





export const registerUser = asyncHandler (async (req, res) =>{
    
    res.send("registerUser ");

});






export const logoutUser = asyncHandler (async (req, res) =>{
    
    res.send("logoutUser");

});






export const getUserProfile = asyncHandler (async (req, res) =>{
    
    res.send("getUserProfile");

});





export const updateUserProfile = asyncHandler (async (req, res) =>{
    
    res.send("updateUserProfile");

});




export const getUserById = asyncHandler (async (req, res) =>{
    
    res.send("getUserById");

});






export const getUsers = asyncHandler (async (req, res) =>{
    
    res.send("getUsers");

});




export const deleteUser = asyncHandler (async (req, res) =>{
    
    res.send("deleteUser");

});



export const updateUser = asyncHandler (async (req, res) =>{
    
    res.send(" updateUser");

});