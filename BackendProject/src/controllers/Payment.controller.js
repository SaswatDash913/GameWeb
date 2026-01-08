import { asynchandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Payment } from "../models/Payment.model.js"
import { User } from "../models/user.model.js"
import { Game } from "../models/game.model.js";

const payment = asynchandler(async(req,res)=>{
    const {gameid} = req.params
    const {firstname,lastname,email,password,address,country,zip} = req.body
    if([firstname,lastname,email,password,address,country,zip].some(field => !field?.trim()))
    {
        throw new ApiError(400,"fields are empty!!")
    }
    const finduser = await User.findOne({
        $or:[{email}]
    })
    const gamepresent = await Game.findById(gameid)
    if(!gamepresent)
    {
        throw new ApiError(400,"game not found!!")
    }
    const Price = gamepresent.price
    if(!finduser)
    {
        throw new ApiError(400,"user not found")
    }
    const PaymentRequestCreate =  await Payment.create({
        firstname,
        lastname,
        email,
        address,
        country,
        zip,
        Price
    })
    const passwordcorrect = await finduser.isPasswordCorrect(password)
    if(!passwordcorrect)
    {
        throw new ApiError(400,"wrong password!!")
    }
    const PaymentRec = await Payment.findById(PaymentRequestCreate._id)
    if(!PaymentRec)
    {
        throw ApiError(400,"request not created")
    }
    finduser.purchasedGames.push(gamepresent)
    const updatedUser = await User.findByIdAndUpdate(
        finduser,
        {$pull:{Library:{ game: gameid}}},
        {new: true}
    )
    await finduser.save()
    return res.status(200)
    .json(new ApiResponse(200,{PaymentRequestCreate},"Payment request accepted"))
    // .json(new ApiResponse(200,{updatedUser}," library updated"))
})
 

export {payment}