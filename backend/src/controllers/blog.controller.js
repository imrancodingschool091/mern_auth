import { uploadOnCloudinary } from "../config/cloudinary.js";
import { Blog } from "../models/blog.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { customError } from "../utils/customError.js";

export const createBlog = asyncHandler(async (req, res) => {
  let { title, description, content } = req.body;

  console.log("inputs",req.body);
  console.log("image",req.file);

  let file = req.file;

  if (!file) {
    throw new customError(400, "Image is required");
  }

  if (!title || !description || !content) {
    throw new customError(400, "All fields are required");
  }

  let cloudinaryImage = await uploadOnCloudinary(file.path);

  let newBlog = await Blog.create({
    title,
    description,
    content,
    image: cloudinaryImage.secure_url,
  });

  res.status(201).json({ // Fixed: removed the extra .json()
  success: true,
  data: newBlog,
  message: "blog created successfully!",
});


});
