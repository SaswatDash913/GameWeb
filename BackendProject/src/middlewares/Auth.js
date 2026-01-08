import jwt from 'jsonwebtoken'
import {asynchandler} from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/user.model.js'

export const verifyJwt = asynchandler(async (req, res, next) => {
  
    const token = req.cookies?.accessToken;
    if (!token) { 
        throw new ApiError(401, "No access token available");
    }

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_SECRET);
        const user = await User.findById(decodedToken._id).select("-password -refreshToken");

        if (!user) {
            
            throw new ApiError(401, "Invalid access token!");
        }

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, "Invalid access token!");
    }
});
