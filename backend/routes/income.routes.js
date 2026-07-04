import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { addIncome, deleteIncome, downloadIncomeExcel, getAllIncome, getIncomeOverview, updateIncome } from '../controller/income.controller.js';


const router = express.Router()

//safe routes
router.post('/add',authMiddleware,addIncome)
router.get('/get',authMiddleware,getAllIncome)
router.put('/update/:id',authMiddleware,updateIncome)
router.delete('/delete/:id',authMiddleware,deleteIncome)
router.get('/downloadIncome',authMiddleware,downloadIncomeExcel)
router.get('/overview',authMiddleware,getIncomeOverview)


export default router