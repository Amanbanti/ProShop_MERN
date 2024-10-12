import express from "express";
import {
    authUser,
    registerUser,
    logoutUser ,
    getUserProfile,
    updateUserProfile,
    getUserById,
    getUsers,
    deleteUser,
    updateUser 
    
    } from '../controllers/userController.js'

const router = express.Router();


router.get('/',getUsers);
router.get('/:id', getUserById);
router.post('/',registerUser);
router.post('/logout',logoutUser);
router.post('/login', authUser);
router.get('/profile',  getUserProfile);
router.put('/profile',  updateUserProfile);
router.delete('/:id',  deleteUser);
router.put('/:id',  updateUser);


export default router;