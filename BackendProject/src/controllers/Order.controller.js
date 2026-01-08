import { Order } from "../models/Order.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asynchandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { Game } from "../models/game.model.js";


const Orderplacement = asynchandler(async(req,res)=>{
    const{user,games,TotalPrice} = req.body
    if ([user, games, TotalPrice].some(field => !field)) {  
        throw new ApiError(400, "Fields are empty! Please fill in all fields.");
    }
    const userExists = await User.findById(user)
    if(!userExists)
    {
        throw new ApiError(400,"user does not exsists")
    }
    const gameExists = await Game.findById(games)
    if(!gameExists)
    {
        throw new ApiError(400,"game is not available")
    }
    if(userExists?.Library[0]?.game._id == games)
    {
        throw new ApiError(400,"game already in order")
    }
    const order = await Order.create({
        user,
        games,
        TotalPrice
    });
    userExists.Library.push({ game: games });
    await userExists.save(); 
    
    res.status(200).json( new ApiResponse(200,{order},"Order created !!!"))
})

const UserOrder = asynchandler(async(req,res)=>{
    const {user} = req.params
    const userpresent = await User.findById(user)
    if(!userpresent)
    {
        throw ApiError(400,"no user found")
    }
    const allorders = await Order.find({user:user}).populate("games.game","-downloadlink ")
    if(!allorders)
    {
        throw ApiError(400,"no orders found !!")
    }
    return res.status(200)
    .json( new ApiResponse(200,{allorders},"all the orders if the user"))
})

const removeOrder = asynchandler(async (req, res) => {
    const { user, gamei } = req.body;
    const username = await User.findById(user);
    if (!username) {
        throw new ApiError(400, "User not found");
    }
    const gamename = await Game.findById(gamei);
    if (!gamename) {
        throw new ApiError(400, "Game not found");
    }
    const updatedUser = await User.findByIdAndUpdate(
        user,
        { $pull: { Library: {game : gamei} } },
        { new: true } 
    );
    return res.status(200).json( new ApiResponse(200, {updatedUser}, "Order removed successfully!"));
});

export {Orderplacement,UserOrder,removeOrder}