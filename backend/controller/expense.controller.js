import expenseModel from '../model/expense.model.js'
import XLSX from 'xlsx'
import getDateRange from '../utils/dataFilter.js'

//------------Add Expense--------------------

export const addExpense = async (req, res) => {
    const userId = req.user._id;
    const { description, amount, category, date } = req.body;

    if (!description || !amount || !category || !date) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required'
        });
    }

    try {
        const newExpense = new expenseModel({
            userId,
            description,
            amount,
            category,
            date: new Date(date)
        });

        await newExpense.save();

        return res.status(201).json({
            success: true,
            message: 'Expense added successfully'
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

//--------------Get Expenses-----------------

export const getAllExpense = async (req, res) => {
    const userId = req.user._id;

    try {
        const expense = await expenseModel.find({ userId }).sort({ date: -1 });

        return res.status(200).json({
            success: true,
            expense
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

//--------------------Update Expense-------------------

export const updateExpense = async (req, res) => {
    const userId = req.user._id;
    const { id } = req.params;
    const { description, amount } = req.body;

    try {
        const updatedExpense = await expenseModel.findOneAndUpdate(
            { _id: id, userId },
            { description, amount },
            { new: true }
        );

        if (!updatedExpense) {
            return res.status(404).json({
                success: false,
                message: 'Expense not found'
            });
        }

        return res.status(200).json({
            success: true,
            expense: updatedExpense,
            message: 'Expense updated successfully'
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

//--------------Delete Expense------------

export const deleteExpense = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    try {
        const deletedExpense = await expenseModel.findOneAndDelete({
            _id: id,
            userId
        });

        if (!deletedExpense) {
            return res.status(404).json({
                success: false,
                message: 'Expense not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Expense deleted successfully'
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

//--------------Download Expense Excel------------------

export const downloadExpenseExcel = async (req, res) => {
    const userId = req.user._id;

    try {
        const expense = await expenseModel.find({ userId }).sort({ date: -1 });

        const plainData = expense.map((exp) => ({
            Description: exp.description,
            Amount: exp.amount,
            Category: exp.category,
            Date: new Date(exp.date).toLocaleDateString()
        }));

        const worksheet = XLSX.utils.json_to_sheet(plainData);

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Expense"
        );

        XLSX.writeFile(workbook, "expense_details.xlsx");

        return res.download("expense_details.xlsx");

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

//--------------Get Expense Overview---------------

export const getExpenseOverview = async (req, res) => {

    try {

        const userId = req.user._id;

        const { range = "monthly" } = req.query;

        const { start, end } = getDateRange(range);

        const expenses = await expenseModel.find({
            userId,
            date: {
                $gte: start,
                $lte: end
            }
        }).sort({ date: -1 });

        const totalExpense = expenses.reduce(
            (acc, cur) => acc + cur.amount,
            0
        );

        const averageExpense =
            expenses.length > 0
                ? totalExpense / expenses.length
                : 0;

        const numberOfTransactions = expenses.length;

        const recentTransactions = expenses.slice(0, 9);

        return res.status(200).json({
            success: true,
            data: {
                totalExpense,
                averageExpense,
                numberOfTransactions,
                recentTransactions,
                range
            },
            message: 'Expense overview generated'
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};