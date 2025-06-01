import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import { connectDb } from "./src/config/db.js"
import authRoutes from "./src/routes/auth.routes.js"
import blogRoutes from "./src/routes/blog.route.js"
import productRoutes from "./src/routes/product.routes.js"
import { errorHandler } from "./src/middlewares/errorHandler.js"


dotenv.config()

const app=express()

app.use(cors({origin:process.env.CLIENT_URL,credentials:true}))
app.use(express.json())
app.use(cookieParser())

app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/blog",blogRoutes)
app.use("/api/v1/products",productRoutes)



app.use(errorHandler)








const port=process.env.PORT || 8080

connectDb().then(()=>{
    
app.listen(port,()=>{
    console.log(`the app is running on port:${port}`);
})
})