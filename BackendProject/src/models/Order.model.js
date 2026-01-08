import mongoose from "mongoose";
import { Schema } from "mongoose";

const OrderSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    games: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Game" 
        }
    ],
    TotalPrice: {
        type: Number,
        required: true
    }
});

export const Order = mongoose.model("Order", OrderSchema);
