import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from './routes/user.routes.js'
import incomeRoutes from './routes/income.routes.js'
import expenseRoutes from './routes/expense.routes.js'
import { connectDB } from "./config/db.js";
import mongoose from "mongoose";
import dashboardRoutes from './routes/dashboard.routes.js'
dotenv.config();
const app=express()
const PORT = process.env.PORT || 4000;



//middlewares
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://your-app-name.vercel.app"
    ],
    credentials: true
  })
);
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//db
connectDB();


//user routes
app.use('/user',userRoutes)

//income routes
app.use('/income',incomeRoutes)

//expense routes
app.use('/expense',expenseRoutes)

//dashboard routes
app.use('/dashboard',dashboardRoutes)



app.listen(PORT,()=>{console.log(`Server started at PORT ${PORT}`)})