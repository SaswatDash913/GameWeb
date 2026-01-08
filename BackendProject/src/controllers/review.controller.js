import { Game } from "../models/game.model.js";
import { User } from "../models/user.model.js";
import { Review } from "../models/review.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asynchandler } from "../utils/asyncHandler.js";

 const CreateReview =  asynchandler(async(req,res)=>{
    const{user,game,review} = req.body

    if ([user, game, review].some(field => !field || (typeof field === "string" && field.trim() === ""))) {
        throw new ApiError(400, "Please fill in all review fields");
    }
    
    const userid = await User.findById(user)
    const gameid = await Game.findById(game)
    console.log(gameid)
    if(!userid)
    {
        throw new ApiError(400,"no user found")
    }
    if(!gameid)
    {
        throw new ApiError(400,"no game found")
    }
    // if(rating>5)
    // {
    //     throw new ApiError(400,"maximun five rating")
    // }

    const reviewrate = {
        user:userid._id,
        game:gameid._id,
        review,
        // rating
    }
    console.log(reviewrate)
    const reviewratenew = await Review.create(reviewrate)
    if(!reviewratenew)
    {
        throw new ApiError(400,"failed to create the review")
    }

    res.status(200)
    .json(new ApiResponse(200,{reviewratenew},"review is uploaded thank you !!!"))
 })

 const getReview = asynchandler(async(req,res)=>{

    const { gameid } = req.params
    console.log(gameid)
    const ReviewsGame = await Review.find({
        game:gameid,
    })

    console.log(ReviewsGame)

    if(ReviewsGame.length == 0 || !ReviewsGame){
        res.status(404).json(new ApiResponse,null,"no review yet!!")
    }

    res.status(200).json(new ApiResponse(200,{ReviewsGame},"reviews LOADED!!!"))

 })
export {CreateReview,getReview}