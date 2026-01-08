import { asynchandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Admin } from "../models/Admin.model.js";
import { User } from "../models/user.model.js";

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

 const AdminCreation = asynchandler(async (req, res) => {
    const { AdminUser, AdminEmail, AdminPassword } = req.body;
    
    if ([AdminUser, AdminEmail, AdminPassword].some(field => !field?.trim())) {
        throw new ApiError(400, "Fields are empty! Please fill in all fields.");
    }

    const existingAdmin = await Admin.findOne({
        $or: [{ AdminUser }, { AdminEmail }]
    });

    if (existingAdmin) {
        throw new ApiError(400, "Admin already exists");
    }

    const createAdmin = await Admin.create({
        AdminUser,
        AdminEmail,
        AdminPassword
    });
    const newAdmin = await Admin.findById(createAdmin._id).select("-AdminPassword");
    return res.status(200).json(new ApiResponse(200, { newAdmin }, "Admin profile created!"));
});

const Adminlogin = asynchandler(async(req,res)=>{

    const{AdminUsername,AdminEmail,AdminPassword} = req.body
   
    const oldAdmin = await Admin.findOne({
        $or: [{ AdminUsername: AdminUsername }, { AdminEmail: AdminEmail }]
    });

    if(!oldAdmin)
    {
        throw new ApiError(400,"no admin found!!!")
    }

    const enteredPass = await oldAdmin.isPasswordCorrect(AdminPassword);

    if(!enteredPass)
    {
        throw new ApiError(400,"wrong password!!")
    }

    const {refreshToken,accessToken} =  generateRefreshAndAccessToken()
    const option = 
    {
        httpOnly:true,
        new:true
    }

    return res.status(200)
    .cookie("refreshtoken",refreshToken,option)
    .cookie("accesstoken",accessToken,option)
    .json(200,{},"login successfull!!")

}) 

const AdminLogout = asynchandler(async(req,res)=>{
    const {refreshToken} = Admin.cookies.refreshToken
    const admin = Admin.findByIdAndUpdate(
        req.Admin._id,
        {
            $set:
            {
                refreshToken:undefined
            }
        },
        {
            new:true
        }
    )

    const option = 
    {
        httpOnly:true,
        new:true
    }

    return res.status(200)
    .clearcookie("refreshToken",option)
    .clearcookie("accessToken",option)
    .json(200,{},"userLogged out")
})




export {AdminCreation,Adminlogin,AdminLogout}