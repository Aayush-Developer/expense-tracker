import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const createToken= async (userId) => {
  return   jwt.sign({id:userId },process.env.JWT_SECRET,{expiresIn:"1d"})
}