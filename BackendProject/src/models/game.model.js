import { Schema } from "mongoose";
import mongoose from "mongoose";

const GameSchema = new Schema({
    uploader:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Admin"
    },
    title:
    {
        type:String,
        required:true,
    },
    description:
    {
        type:String,
        required:true
    },
    genre:
    {
        type:String,
        required:true,
    },
    price:
    {
        type:Number,
        required:true,
    },
    downloadLink:
    {
        type:String,
        required:true,
    },
    coverImage:
    {
        type:String,
        required:true
    },
    
},{timestamps:true})
export const Game = mongoose.model("Game",GameSchema)