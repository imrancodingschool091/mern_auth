import jwt from "jsonwebtoken";
import { customError } from "../utils/customError.js";
import { User } from "../models/user.model.js";

export const isAuthenticate = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return next(new customError(403, "Unauthorized! Token missing"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return next(new customError(401, "User not found"));
    }

    req.user = user;
    console.log(req.user)
    next();
  } catch (error) {
    return next(new customError(401, "Invalid or expired token"));
  }
};
