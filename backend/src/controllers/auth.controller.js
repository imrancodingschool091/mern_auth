import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getToken } from "../utils/createToken.js";
import { customError } from "../utils/customError.js";
import bcrypt from "bcrypt";

export const userRegister = asyncHandler(async (req, res, next) => {
  let { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new customError(400, "All Fields Are Required");
  }

  let existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new customError(400, "User Alredy Exits");
  }
  let hashedPassword = await bcrypt.hash(password, 10);

  let newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = getToken(newUser._id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 1000,
  });

  res.status(201).json({
    success: true,
    message: "User Register Sucessfully",
  });
});

export const userLogin = asyncHandler(async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    throw new customError(400, "All Fields Are Required");
  }

  let user = await User.findOne({ email });

  if (!user) {
    throw new customError(400, "Email Or Password Does Not Match!");
  }

  let isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new customError(400, "Email Or Password Does Not Match!");
  }

  let token = getToken(user._id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    message: "User Login Sucessfully",
  });
});

export const userLogout = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({ success: true, message: "User Logout Sucessfully" });
});



export const user = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Authenticated user data",
    user: req.user, // From middleware
  });
});