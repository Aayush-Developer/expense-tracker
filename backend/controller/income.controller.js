import express from 'express'
import incomeModel from '../model/income.model.js'
import XLSX from 'xlsx'
import getDateRange from '../utils/dataFilter.js'

//------------Add income--------------------

export const addIncome =async (req,res)=>{
    const userId=req.user._id
    const {description,amount,category,date}=req.body
    if(!description || !amount || !category || !date){
        return res.status(400).json({
            success:false,
            message:'All fields are required'
        })
    }
    try{
        const newIncome=new incomeModel({
            userId,description,amount,category,date:new Date(date)
        })
        await newIncome.save()
        return res.status(201).json({
            success:true,
            message:'Income added successfully'
        })
    }
    catch(error){
        console.error(error)
        return res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }

}

//--------------Get Income-----------------
export const getAllIncome=async (req,res)=>{
    const userId=req.user._id
   
  try{
    const income=await incomeModel.find({userId}).sort({date:-1})
    return res.json({income})
  }
  catch(error){
    console.error(error)
     return res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
  }
}

//--------------------Update an income-------------------

export const updateIncome=async (req,res)=>{
     const userId=req.user._id
     const {id}=req.params
     const { description, amount, category, date } = req.body;
     try{
        const updatedIncome=await incomeModel.findOneAndUpdate(
            {_id:id, userId},
            {description,
    amount,
    category,
    date},
            {new:true});
        
        if(!updatedIncome){
            return res.status(400).json({
                success:false,
                message:'Income not found'
            })
        }
        return res.status(200).json({
            success:true,
            income:updatedIncome,
            message:'Income updated successfully'
        })
        }
        catch(error){
            console.error(error)
            return res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
        }

        
}

//--------------Delete an income------------

export const deleteIncome=async (req,res)=>{
    const {id}=req.params
     const userId=req.user._id
     try{
        const deletedIncome=await incomeModel.findOneAndDelete({_id:id,userId})
        if(!deletedIncome){
            return res.status(404).json({
                success:false,
                message:'Income not found'
            })
        }
        return res.status(200).json({
            success:true,
            message:'Income deleted successfully'
        })
     }
     catch(error){
        console.error(error)
            return res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
     }
}

//--------------Download income excel sheet ------------------

export const downloadIncomeExcel = async (req, res) => {

    const userId = req.user._id;

    try {

        const income = await incomeModel
            .find({ userId })
            .sort({ date: -1 });

        const plainData = income.map((inc) => ({

            Description: inc.description,

            Amount: inc.amount,

            Category: inc.category,

            Date: new Date(inc.date).toLocaleDateString(),

        }));

        const worksheet = XLSX.utils.json_to_sheet(plainData);

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Income"
        );

        const buffer = XLSX.write(workbook, {

            type: "buffer",

            bookType: "xlsx",

        });

        res.setHeader(

            "Content-Disposition",

            "attachment; filename=income_details.xlsx"

        );

        res.setHeader(

            "Content-Type",

            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

        );

        return res.send(buffer);

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error",

        });

    }

};

//--------------Get income overview---------------

export const getIncomeOverview=async (req,res)=>{
  
    try{
          const userId=req.user._id
          const {range="monthly"}=req.query
          const {start,end}=getDateRange(range)
          const incomes=(await incomeModel.find({userId,date:{$gte:start,$lte:end}})).sort({date:-1})
          


           const totalIncome = incomes.reduce((acc, cur) => acc + cur.amount, 0);
           const averageIncome = incomes.length > 0 ? totalIncome / incomes.length : 0;
           const numberOfTransactions = incomes.length;
           const recentTransactions = incomes.slice(0, 9);

           return res.status(200).json({
             success:true,
             data:{
                totalIncome,
                averageIncome,
                numberOfTransactions,
                recentTransactions,
                range
             },
             message:'Income overview generated' 
           })
    }
    catch(error){
        console.error(error)
         return res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }

}