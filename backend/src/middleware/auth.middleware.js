import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { User } from '../models/user.model.js';

export const isAuthenticated = asyncHandler(async (req, res, next) => {
   try {
      const token = req.cookies?.Token || req.header("Authorization")?.replace("Bearer ", "");

      if (!token) {
         return res.status(401).json({
            message: "Unauthorized request",
            success: false
         });
      }

      const decode = jwt.verify(token, process.env.SECRET_KEY);
      // console.log("Decoded Token:", decode);
      const user = await User.findById(decode.id);
      if (!user) {
         return res.status(404).json({
            message: "User not found",
            success: false
         });
      }

      req.user = user;
      next();
   } catch (error) {
      console.log("Error in isAuthenticated middleware:", error);
      res.status(500).json({
         message: "Internal server error",
         success: false
      });
   }
});
