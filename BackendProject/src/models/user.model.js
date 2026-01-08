import { Schema } from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mongoose from "mongoose";

const userSchema = new Schema({
    username:
    {
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true
    },
    email:
    {
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        unique:true
    },
    password:
    {
        type:String,
        required:true,
        unique:true,
    },
    avatar:
    {
        type:String,
        required:true
    },
    address:
    {
        city: String,
        state: String,
        zipCode: String,
        country: String,  
    },
    wishList:
    [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Game"        
        }
    ],
    DownloadedGames:
    [
      {
        downloadId:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Game"
        },
        DownloadDate:
        {
            type:Date,
            default:Date.now()
        }
      }
    ],
    purchasedGames: [
        {
            purchaseId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Game"
            },
            purchasedDate: { 
                type: Date,
                default: Date.now
            }
        }
    ],
    Library: [
        {
            game: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Game"
            },
            addedDate: {
                type: Date,
                default: Date.now
            }
        }
    ]
    
},{timestamps:true})



userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
        },
        process.env.ACCESS_SECRET,
        { expiresIn: process.env.ACCESS_EXP } 
    );
};


userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_SECRET,
        { expiresIn: process.env.REFRESH_EXP } 
    );
};

export  const User = mongoose.model("User",userSchema)