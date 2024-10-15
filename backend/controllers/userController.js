
import asyncHandler from "../middleware/asyncHandler.js";
import User from '../models/userModel.js';
import { generateToken } from "../utils/generateToken.js";


export const authUser = asyncHandler (async (req, res) =>{
    const {email , password} = req.body;

    const user = await User.findOne({
        email: email
    })
    if(user && (await user.matchPassword(password))){
        
        generateToken ( res,user._id)
        res.status(200).json({
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
    const {name, email,password} = req.body;
    const userExist = await User.findOne({
        email: email
    })

    if( userExist){
        res.status(400);
        throw new Error('User Already Exist!')
    }else{
        const user = await User.create({
            name : name,
            email: email,
            password: password,
        })
        if(user){
        generateToken ( res,user._id)
           res.status(201).json({
            _id:user._id,
            name: user.name,
            email:user.email,
            isAdmin: user.isAdmin
           })
        }else{
            res.status(400);
            throw new Error('Invalid User Data!')
           }
    }

});





export const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0), // Expire the cookie
    });

    res.status(200).json({ message: 'Logged out successfully' });
});





export const getUserProfile = asyncHandler (async (req, res) =>{
    const user = await User.findById(req.user._id);
    
    if (user){
        res.status(200).json({
            _id:user._id,
            name: user.name,
            email:user.email,
            isAdmin: user.isAdmin
           })

    }else{
        res.status(404);
        throw new Error('User not found!')
    }
});




export const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        // Check if the password is provided in the request body
        if (req.body.password) {
            user.password = req.body.password; // This will trigger the pre-save middleware to hash the password
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        });
    } else {
        res.status(404);
        throw new Error('User not found!');
    }
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