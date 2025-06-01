import express from "express";
import { createBlog } from "../controllers/blog.controller.js";
import { upload } from "../middlewares/upload.js";

const router=express.Router()

router.post("/",upload.single('image'),createBlog)

export default router

