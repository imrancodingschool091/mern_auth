import express from "express"
import { user, userLogin, userLogout, userRegister } from "../controllers/auth.controller.js"
import { isAuthenticate } from "../middlewares/authenticate.js"

const router=express.Router()

router.post("/register",userRegister)
router.post("/login",userLogin)
router.get("/logout",userLogout)
router.get("/user", isAuthenticate, user)


export default router