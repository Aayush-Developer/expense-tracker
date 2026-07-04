import mongoose, { mongo } from "mongoose";
import { Schema } from "mongoose";

const incomeSchema=new Schema({
    description:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:true

    },
    type:{
        type:String,
        default:"income",
    }
},{
    timestamps:true
});
const incomeModel=mongoose.models.income || mongoose.model("income",incomeSchema)
export default incomeModel