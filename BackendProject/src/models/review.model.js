import { Schema } from "mongoose";
import mongoose from "mongoose";

const ReviewSchema = new Schema({
    user:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    game:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Game"
    }, 
    rating:
    {
        type:Number,
        Range:5
    },
    review:
    {
        type:String,
    }

},{timestamps:true})
export const Review = mongoose.model("Review",ReviewSchema)