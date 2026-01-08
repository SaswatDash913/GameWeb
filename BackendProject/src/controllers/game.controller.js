import { Game } from "../models/game.model.js";
import { asynchandler } from "../utils/asyncHandler.js";
import { Admin } from "../models/Admin.model.js";
import { uploadonCloudinary } from "../utils/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";

const GameCreate = asynchandler(async (req, res) => {
    const { uploader, title, description, genre, price, downloadLink } = req.body;

    if ([uploader, title, description, genre, price, downloadLink].some(field => !String(field || "").trim())) {
        throw new ApiError(400, "Fields are empty!! Please fill in all fields.");
    }
    if (!mongoose.Types.ObjectId.isValid(uploader)) {
    throw new ApiError(400, "Invalid Admin ID");
    }
    
    const admin = await Admin.findById(uploader);
    
    if (!admin) {
        throw new ApiError(400, "Admin not found");
    }

  
    const coverImageFile = req.files?.coverImage?.[0]?.path;
    if (!coverImageFile) {
        throw new ApiError(400, "Cover image is required!");
    }


    const coverImageUpload = await uploadonCloudinary(coverImageFile);
    if (!coverImageUpload || !coverImageUpload.url) {
        throw new ApiError(400, "Failed to upload cover image!");
    }

   
    const gamedetails = {
        uploader,
        title,
        description,
        genre,
        price,
        downloadLink,
        coverImage: coverImageUpload.url 
    };

    
    const creatingGame = await Game.create(gamedetails);
    const newgame = await Game.findById(creatingGame._id).select("-downloadLink");

    return res.status(200).json(new ApiResponse(200, { newgame }, "Game uploaded successfully"));
});
const AllGames = asynchandler(async (req, res) => {
    const games = await Game.find(); 
    
    if (games.length === 0) {
        throw new ApiError(400, "No games found");
    }

    res.status(200).json(new ApiResponse(200, { games }, "All games fetched successfully"));
});
const currentgame = asynchandler(async (req, res) => {
    const { gameid } = req.params;
    if (!gameid) {
        throw new ApiError(400, "Failed to find game");
    }
    const game = await Game.findById(gameid); 
    if (!game) {
        throw new ApiError(404, "Can't find the game");
    }
    res.status(200).json(new ApiResponse(200, { game }, "Found the game!!"));
});



const purchasedGames = asynchandler(async(req,res)=>{
    
})
export { GameCreate,AllGames,currentgame};
