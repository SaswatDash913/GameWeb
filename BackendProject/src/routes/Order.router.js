import {Router} from "express"
import { Orderplacement, removeOrder } from "../controllers/Order.controller.js"

const router = Router()
router.route("/orderplacement").post(Orderplacement)
router.route("/removeorder").post(removeOrder)


export default router


