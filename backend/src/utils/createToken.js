import jwt from "jsonwebtoken";

export const getToken = (user_id) => {
  return jwt.sign({ id: user_id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};
