
import asyncHandler from "../middleware/asyncHandler.js";
import User from '../models/userModel.js';
import jwt from "jsonwebtoken";


export const authUser = asyncHandler (async (req, res) =>{
    const {email , password} = req.body;

    const user = await User.findOne({
        email: email
    })
    if(user && (await user.matchPassword(password))){
        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET
            ,{
                expiresIn: '30d'
            });

        //set JWT as HTTP-Only cookie
        res.cookie('jwt', token,{
            httpOnly:true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite : 'strict',
            maxAge:30 * 24 * 60 * 1000 //30days
        })

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





export const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        expires: new Date(0), // Expire the cookie
    });

    res.status(200).json({ message: 'Logged out successfully' });
});





export const getUserProfile = asyncHandler (async (req, res) =>{
    
    res.send("getUserProfile");

});




export const updateUserProfile = asyncHandler (async (req, res) =>{
    
    res.send("updateUserProfile");

});




export const getUserById = asyncHandler (async (req, res) =>{
    
    res.send("getUserById!");

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