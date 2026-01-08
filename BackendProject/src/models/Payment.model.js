import mongoose, { mongo } from 'mongoose'
import { Schema } from 'mongoose'

const PaymentSchema = new Schema ({
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
    amountPaid:
    {
        type:Number,
        reqired:true
    },
    PayemntStatus:
    {
        type:String,
        default:"success"
    },
    PayemntMethord:
    {
        type:String,
        reqired:true,
        enum:["Debit card","Credit card","Razor Pay"]
    },
})
export const Payment = mongoose.model("Payment", PaymentSchema )
