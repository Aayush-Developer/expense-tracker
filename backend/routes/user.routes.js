import express from 'express';
import { getCurrentUser, loginUser, registerUser, updatePassword, updateUser } from '../controller/user.controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router=express.Router()

router.post('/register',registerUser)

router.post('/login',loginUser)

//protected routes (authMiddleware)
router.get('/me',authMiddleware,getCurrentUser)
router.put('/profile',authMiddleware,updateUser)
router.put('/password',authMiddleware,updatePassword)
 
export default router