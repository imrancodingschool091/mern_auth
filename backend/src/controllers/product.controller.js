import { Product } from "../models/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { customError } from "../utils/customError.js";

// CREATE PRODUCT
export const createProduct = asyncHandler(async (req, res) => {
  const { name, description, category, price } = req.body;

  if (!name || !description || !category || !price) {
    throw new customError(400, "All fields are required");
  }

  const newProduct = await Product.create({
    name,
    description,
    category,
    price,
  });

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    product: newProduct,
  });
});

// GET ALL PRODUCTS (optional search)
export const getAllProducts = asyncHandler(async (req, res) => {
  const search = req.query.search || "";
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  let filter = {};
  const priceValue = Number(search);

  if (search) {
    filter = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        ...(isNaN(priceValue) ? [] : [{ price: priceValue }]),
      ],
    };
  }

  const total = await Product.countDocuments(filter); // total matching products
  const products = await Product.find(filter)
    .skip(skip)
    .limit(limit)
    
  res.status(200).json({
    success: true,
    total,
    page,
    pages: Math.ceil(total / limit),
    limit,
    data: products,
  });
});
