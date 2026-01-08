import { Router } from "express";
import { AdminCreation, Adminlogin } from "../controllers/Admin.controller.js";


const router = Router()

router.route("/createadmin").post(AdminCreation)
router.route("/loginad").post(Adminlogin)


export default router