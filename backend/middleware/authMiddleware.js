import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // req.header.authorization like Beared token
      token = req.headers.authorization.split(" ")[1];

      // Docoded jwt
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // find logged in user
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authenticated, Token failed!!!");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authenticated, no token");
  }
});
