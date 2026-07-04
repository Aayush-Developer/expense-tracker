
import User from '../model/user.model.js'
import dotenv from  'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
dotenv.config()

export const authMiddleware=async (req,res,next)=>{

    //get the bearer+token 
      const authHeader=req.headers.authorization
      try{
      if(!authHeader){
        return res.status(400).json({
            success:false,
            message:'Missing Token'
        })
      }
      //split the token only 
      const token=authHeader.split(" ")[1]

      //compare the token 
      const payload=await jwt.verify(token,process.env.JWT_SECRET)
     
      //select the user with that id dont select the password
      const user=await User.findById(payload.id).select("-password")
     
      if(!user){
        return res.status(400).json({
             success:false,
             message:'User not found'
        })
     }
     req.user=user
     next()
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'Server Error'
        })
    }
}