import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';

import {
    addExpense,
    deleteExpense,
    downloadExpenseExcel,
    getAllExpense,
    getExpenseOverview,
    updateExpense
} from '../controller/expense.controller.js';

const router = express.Router();

// Protected Routes
router.post('/add', authMiddleware, addExpense);

router.get('/get', authMiddleware, getAllExpense);

router.put('/update/:id', authMiddleware, updateExpense);

router.delete('/delete/:id', authMiddleware, deleteExpense);

router.get('/downloadExpense', authMiddleware, downloadExpenseExcel);

router.get('/overview', authMiddleware, getExpenseOverview);

export default router;