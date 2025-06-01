import mongoose from "mongoose"

const blogSchema=new mongoose.Schema({

   title:String,
   description:String,
   image:String,
   content:String,


},{timestamps:true})

export const Blog=mongoose.model("Blog",blogSchema)