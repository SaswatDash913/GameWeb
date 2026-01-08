import { Router } from "express";
import { payment } from "../controllers/Payment.controller.js";

const router = Router()
router.route("/paymentcreate/:gameid").post(payment)

export default router