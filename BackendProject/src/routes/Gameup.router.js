import { Router } from "express";
import { GameCreate,AllGames, currentgame } from "../controllers/game.controller.js";
import { upload } from "../middlewares/multer.js"; 

const router = Router()
router.route("/gamecreate").post(
    upload.fields([
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    GameCreate
);
router.route("/games").get(AllGames)
router.route("/curentgame/:gameid").get(currentgame)


export default router