import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category:{
       type: String,
       enum:['Apple','Mi','Vivo','Samsung'],
       required:true

    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);


export const Product=mongoose.model("Product",productSchema)