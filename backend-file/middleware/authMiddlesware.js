import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// admin role
// const isAdmin = asyncHandler(async (req, res, next) => {
//   const { email } = req.user;
//   const adminUser = await User.findOne({ email });

//   if(adminUser.role !== "admin"){
//     throw new Error ("You are not an admin");
//   } else {
//     next();
//   }
// });
const isAdmin = asyncHandler(async (req, res, next) => {
  const { email } = req.user;

  try {
    const adminUser = await User.findOne({ email });

    if (!adminUser || adminUser.role !== "admin") {
      throw new Error("You are not an admin");
    }

    // If the user is an admin, continue to the next middleware
    next();
  } catch (error) {
    // Handle database errors or other issues
    console.error("isAdmin middleware error:", error);
    res.status(500).send("Internal Server Error");
  }
});



export{ protect,isAdmin };