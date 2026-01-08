import { Router } from "express";
import { CreatingUser,LoginUser,LogoutUser,refreshAccessToken,CurrentUser,changePassword, AddToLibrary, LibraryGames } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.js"; 
import { verifyJwt } from "../middlewares/Auth.js";

const router = Router();

router.route("/create").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }
    ]),
    CreatingUser
);

router.route("/login").post(LoginUser)
router.route("/logout").post(verifyJwt,LogoutUser)
router.route("/refreshaccess").post(refreshAccessToken)
router.route("/curent").get(verifyJwt,CurrentUser)
router.route("/changepass").post(verifyJwt,changePassword)
router.route("/addtolib/:gameid").post(verifyJwt, AddToLibrary);
router.route("/allgames").get(verifyJwt,LibraryGames)




export default router;
