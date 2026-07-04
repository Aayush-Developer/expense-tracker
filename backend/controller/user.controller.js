import User from '../model/user.model.js'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { createToken } from '../utils/jwt.js'

//----------------------------------Register---------------------------
export const registerUser= async (req,res)=>{
       const {name,email,password}=req.body
       
       //check if any field is empty
       if(!name || !email || !password){
        return res.status(400).json({
            success: false,
           message: "All fields are required"
        })
       }
      //valid email or not  
      if(!validator.isEmail(email)){
        return res.status(400).json({
            success:false,
            message:'Invalid Email'
        })
      }
      if(password.length<8){
          return res.status(400).json({
            success:false,
            message:'Password must be 8 characters long'
        })
      }
    try{
     //findOne returns a single object or null  
    const existingUser=await User.findOne({email})
    if(existingUser){
        return res.status(409).json({
            success:false,
            message:'User already registered'
        })
    }
         
     const hashedPass=await bcrypt.hash(password,10)
     const user= await User.create({name,email,password:hashedPass})
     const token=await createToken(user._id);
     return res.status(201).json({
        success:true,
        token,
        user:{id:user._id,name:user.name,email:user.email}
     })
    } catch(error){
        console.error(error)
         return res.status(500).json({
            success:false,
            message:'Server Error' 
        })
    }
}

//--------------------------Login------------------------------

export const loginUser=async (req,res)=>{
     const {email,password} = req.body
    
     if(!email || !password){
        return res.status(400).json({
            success:false,
            message:'All fields are required'
        })
     }
     try {
        const existingUser=await User.findOne({email})
        if(!existingUser){
            return res.status(409).json({
                success:false,
                message:'Invalid email or password'
            })
        }
        //verify the password
        const isMatch=await bcrypt.compare(password,existingUser.password)
         if(!isMatch){
            return res.status(409).json({
                success:false,
                message:'Invalid email or password'
            })
        }
        const token=await createToken(existingUser._id)
        return res.status(200).json({
            success:true,
            token,
            user:{
               id:existingUser._id,
               name:existingUser.name,
               email:existingUser.email
            }
        })
            
        
     } catch (error) {
        console.error(error)
         return res.status(500).json({
            success:false,
            message:'Server Error' 
        })
     }
}

//-----------------Get User Profile-----------------------

export const getCurrentUser=async (req,res)=>{
    try{
        const existingUser=await User.findById(req.user.id).select("name email")
        if(!existingUser){
            return res.status(404).json({
                success:false,
                message:'User not found'
            })
        }
        return res.status(200).json({
            success:true,
            user: existingUser
        })
    }
    catch (error) {
        console.error(error)
         return res.status(500).json({
            success:false,
            message:'Server Error' 
        })
     }
}



//------------------Update the User---------------------------

export const updateUser=async (req,res)=>{
    const {name,email}=req.body;
    if(!name || !email || !validator.isEmail(email)){
        return res.status(400).json({
            success:false,
            message:'All fields are required'
        })
    }
    try{
        const existingUser=await User.findOne({email,_id:{$ne:req.user.id}})
        if(existingUser){
            return res.status(409).json({
                success:false,
                message:'Email already in use'
            })
        }
        const user=await User.findByIdAndUpdate(req.user.id, {
        name,
        email
    },
    {
        new: true,
        runValidators: true
    }
).select("name email");
        return res.status(201).json({
            success:true,
             message: "Profile updated successfully",
            user
        })
    }
    catch(error){
        console.error(error)
         return res.status(500).json({
            success:false,
            message:'Server Error' 
        })
    }
}

//------------Update Password--------------------

export const updatePassword=async (req,res)=>{
    const { currentPassword, newPassword } = req.body;
    if(!currentPassword || !newPassword || newPassword.length<8){
        return res.status(400).json({
            success:false,
            message:'All fields are required'
        })
    }
    try{
        const user=await User.findById(req.user.id).select("password")
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not exist"
            })
        }
        //only let user change Password when the currPassword matches the password
        const isMatch=await bcrypt.compare(currentPassword,user.password)
        if(!isMatch){
            return res.status(404).json({
                success:false,
                message:'Invalid password'
            })
        }

        user.password=await bcrypt.hash(newPassword,10)
        await user.save()
        return res.status(200).json({
            success:true,
            message:'Password updated'
        })
    }
    catch(error){
         console.error(error)
         return res.status(500).json({
            success:false,
            message:'Server Error' 
        })
    }
}