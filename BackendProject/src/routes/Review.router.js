import { Router } from "express";
import { CreateReview,getReview } from "../controllers/review.controller.js";

const router = Router()

router.route("/reviewcreate").post(CreateReview)
router.route("/getallreview/:gameid").get(getReview)

export default router
