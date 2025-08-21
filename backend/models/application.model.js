import mongoose from "mongoose";

// for - Jo Job apply krega  
// also establishing relationship b/w multiple models/Schemas/Table  ....

const applicationSchema = new mongoose.Schema({
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Job',
        required:true
    },
    // telling - Jo apply krega User ....wohi applicant h naa yrr !  
    applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    status:{
        type:String,
        enum:['pending', 'accepted', 'rejected'],
        default:'pending'
    }
},{timestamps:true});
export const Application  = mongoose.model("Application", applicationSchema);
