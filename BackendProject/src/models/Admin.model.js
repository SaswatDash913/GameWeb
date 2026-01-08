import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from 'bcrypt'

const AdminSchema = new Schema({
    AdminUser:
    {
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true  
    },
    AdminPassword:
    {
        type:String,
        required:true,
    },
    AdminEmail:
    {
        type:String,
        required:true
    },
})

AdminSchema.pre("save", async function(next) {
    if (!this.isModified("AdminPassword")) return next();
    this.AdminPassword = await bcrypt.hash(this.AdminPassword, 10);
    next();
});


AdminSchema.methods.isPasswordCorrect  = async function (password){
    return await bcrypt.compare(password,this.AdminPassword)
}

export const  Admin = mongoose.model("Admin",AdminSchema)


