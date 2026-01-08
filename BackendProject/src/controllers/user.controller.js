import {asynchandler} from "../utils/asyncHandler.js"
import {User} from '../models/user.model.js'
import {uploadonCloudinary} from '../utils/cloudinary.js'
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import { verifyJwt } from "../middlewares/Auth.js"
import { Game } from "../models/game.model.js"


const generateRefreshAndAccessToken = async(userId) =>{
   try {
     const user =  await User.findById(userId)
     const AccessToken = user.generateAccessToken()
     const RefreshToken = user.generateRefreshToken ()
     user.RefreshToken = RefreshToken
     await user.save({validateBeforeSave:false})
     return{AccessToken,RefreshToken}
   } catch (error) {
    throw new ApiError(500,"SOMETHING WENT WRONG!! failed to generate access and refresh TOKEN")
   }
}

const CreatingUser = asynchandler(async(req,res)=>{


    const {username,email,password,address} = req.body
    if ([username, email, password, address].some(field => !field?.trim())) {
        throw new ApiError(400, "Fields are empty!! please fill in");
    }
    
    const exsistingUser = await User.findOne({
        $or:[{username},{email}]
    })

    if(exsistingUser)
    {
        throw new ApiError(409,"the user already exsists!!")
    }

    let avatarLocalPath =req.files?.avatar[0]?.path 
    if(!avatarLocalPath)
    {
        throw new ApiError(400,"avatar is required!!")
    }
    let avatarpath = await uploadonCloudinary(avatarLocalPath) 
    if(!avatarpath)
    {
        throw new ApiError(400,"LOADING error!!")
    }

    let userData = {
        username,
        email,
        password,
        address,
        avatar:avatarpath?.url
    }

    const createdUser = await User.create(userData);
    const newUser = await User.findById(createdUser._id).select("-email");

    if(!newUser){
        throw new ApiError(400,"Error in object creation")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,newUser,"User created"))
})

const LoginUser = asynchandler(async (req, res) => {
    const { username, email, password } = req.body;

    const userlogin = await User.findOne({
        $or: [{ username: username }, { email: email }]
    });

    if (!userlogin) {
        throw new ApiError(400, "No user found!!");
    }

    const isPasswordCorrect = await userlogin.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
        throw new ApiError(400, "Wrong password");
    }

    const { AccessToken, RefreshToken } = await generateRefreshAndAccessToken(userlogin._id);

    const Usercred = await User.findById(userlogin._id).select("-password -RefreshToken");

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "lax"
    };

    return res
        .status(200)
        .cookie("refreshToken", RefreshToken, options)
        .cookie("accessToken", AccessToken, options)
        .json(new ApiResponse(200, { user: Usercred, accessToken: AccessToken }, "LOGIN successful!!"));
});


const LogoutUser = asynchandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                RefreshToken:undefined
            }
        },
        {
            new:true
        }
    )

    const option =
    {
        httpOnly:true,
        secure:true
    }
    return res
    .status(200)
    .clearCookie("RefreshToken",option)
    .clearCookie("AccessToken",option)
    .json(new ApiResponse(200,{},"user logedout!!"))
})


const changePassword = asynchandler(async(req,res)=>{
    const{oldpassword,newpassword} = req.body
    const user  = await User.findById(req.user?._id)
    const passwordcorrect = user.isPasswordCorrect(oldpassword)
    if(!passwordcorrect)
    {
        throw new ApiError(400,"wrong password!!")
    }
    user.password = newpassword
    await user.save({validateBeforeSave:false})
    res.status(200)
    .json(200,{},"passwordchanged")
})

const CurrentUser = asynchandler(async(req,res)=>{
    const {username}= req.user
    return res
    .status(200)
    .json(new ApiResponse(200,req.user,"fetched !!"))
})

const refreshAccessToken = asynchandler(async (req, res) => {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
        throw new ApiError(401, "No refresh token found!");
    }

    const tokenPayload = verifyJwt(refreshToken, process.env.REFRESH_SECRET);
    if (!tokenPayload) {
        throw new ApiError(403, "Invalid refresh token!");
    }

    const { AccessToken, RefreshToken } = await generateRefreshAndAccessToken(tokenPayload._id);

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
    };

    return res
        .status(200)
        .cookie("refreshToken", RefreshToken, options)
        .cookie("accessToken", AccessToken, options)
        .json(new ApiResponse(200, { accessToken: AccessToken }, "Access token refreshed"));
});


const AddToLibrary = asynchandler(async (req, res) => {
    const { gameid } = req.params;
    const userid = req.user._id;
    
    const findgame = await Game.findById(gameid);
    if (!findgame) {
        throw new ApiError(400, "GAME NOT FOUND!!");
    }

    const finduser = await User.findById(userid);

    if (!finduser) {
        throw new ApiError(400, "User not found");
    }

    const gamePresent = finduser.Library.some((item) => item.game.equals(gameid));
    if (gamePresent) {
        throw new ApiError(400, "Game already present in Library");
    }

    finduser.Library.push({ 
        game: {
            _id: findgame._id,
            title: findgame.title,
            coverImage: findgame.coverImage,
            description: findgame.description,
            price: findgame.price
        }
    });

    await finduser.save();

    res.status(200).json(new ApiResponse(200, {}, "Game added to Library!"));
});

const LibraryGames = asynchandler(async (req, res) => {
    const userid = req.user._id;

    const finduser = await User.findById(userid)
        .populate({
            path: "Library.game",
            model: "Game",
            select: "title coverImage description price", 
        });

    if (!finduser) {
        throw new ApiError(400, "User not found");
    }

    res.status(200).json(new ApiResponse(200, { Library: finduser.Library }, "Library fetched!"));
});

export {CreatingUser,LoginUser,LogoutUser,changePassword,CurrentUser,refreshAccessToken,AddToLibrary,LibraryGames}









