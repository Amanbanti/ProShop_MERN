
import asyncHandler from "../middleware/asyncHandler.js";
import User from '../models/userModel.js';


export const authUser = asyncHandler (async (req, res) =>{
    
    res.send("auth user");

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