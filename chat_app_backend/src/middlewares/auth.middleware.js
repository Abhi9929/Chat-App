import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import jwt from 'jsonwebtoken';

const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.headers.authorization?.replace('Bearer ', '') ||
      req.cookies?.SessionID;
    if (!token) {
      throw new ApiError(401, 'Unauthorized request');
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decodedToken._id).select(
      '-password -accessToken'
    );
    if (!user) {
      throw new ApiError(401, 'Invalid Access Token');
    }

    // adding a new obj in req
    req.user = user;
    next();
  } catch (error) {
    console.log('inside catch');
    throw new ApiError(401, error?.message || 'Invalid Access Token');
  }
});

export default verifyJWT;
