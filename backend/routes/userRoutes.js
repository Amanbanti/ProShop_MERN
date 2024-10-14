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

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/profile', protect , getUserProfile);
router.get('/',protect,admin,getUsers);
router.get('/:id',protect,admin, getUserById);
router.post('/',registerUser);
router.post('/logout',logoutUser);
router.post('/login', authUser);
router.put('/profile', protect, updateUserProfile);
router.delete('/:id',protect,admin,  deleteUser);
router.put('/:id',protect,admin,  updateUser);


export default router;