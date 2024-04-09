import { asyncHandler } from '../utils/asyncHandler.js';
import zod from 'zod';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const getReceiver = asyncHandler(async (req, res) => {
  let receiverId = req.params?.receiverId;
  receiverId = receiverId.replace(':', '');

  const receiver = await User.findById(receiverId).select("-password -accessToken -createdAt -updatedAt -email")

  if(!receiver) {
    throw new ApiError(411, 'User not found')
  }

  return res.json(new ApiResponse(200, receiver))
})

const getAllUser = asyncHandler(async (req, res) => {
  const allUsers = await User.find().select(
    '-email -password -accessToken -createdAt -updatedAt'
  );
  if (!allUsers) {
    throw new ApiError(411, 'Failed to retieve users');
  }
  return res.json({ allUsers });
});

// input validation for signup
const userschema = zod.object({
  username: zod.string().min(1, { message: 'name must be 1 character' }),
  email: zod.string().email({ message: 'Invalid credentials' }),
  password: zod
    .string()
    .min(6, { message: 'password must be of 6 characters' }),
});
const signUpUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const response = userschema.safeParse({
    username,
    email,
    password,
  });
  if (!response.success) {
    throw new ApiError(411, response.error);
  }

  // check for existing user:
  const existingUser = await User.find({ email });
  // console.log(existingUser);
  if (existingUser.length > 0) {
    throw new ApiError(411, 'User with this email already exists');
  }

  // Now we can create a user in db
  const user = await User.create({
    username,
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select(
    '-password -accessToken'
  );

  const token = jwt.sign(
    {
      _id: createdUser._id,
      email,
      password,
    },
    process.env.JWT_SECRET
  );

  //   console.log(`user with id ${createdUser._id} created`);
  return res
    .status(201)
    .cookie('SessionID', token, {
      httpOnly: true,
      secure: false, // set ssecure to be false
    })
    .json(
      new ApiResponse(
        200,
        {
          createdUser,
          token,
        },
        'User registered successfully'
      )
    );
});

// input validation for login
const loginschema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(1),
});
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // checking inputs
  const response = loginschema.safeParse({ email, password });
  if (!response.success) {
    throw new ApiError(411, 'Invalid email');
  }

  // checking for email
  const user = await User.findOne({ email });
  //   console.log("User: ", user);
  if (!user) {
    throw new ApiError(404, 'User does not exist');
  }

  // checking for password
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, 'incorrect password.');
  }

  // generating accessToken
  const token = jwt.sign(
    {
      _id: user._id,
      email,
      password,
    },
    process.env.JWT_SECRET
  );

  user['accessToken'] = token;
  user.save({ validateBeforeSave: false }); //*imp

  // optional step
  const loggedInUser = await User.findById(user._id).select(
    '-email -password -accessToken -createdAt -updatedAt'
  );

  let options = {
    maxAge: 60 * 60 * 1000, // would expire in 60minutes
    httpOnly: true, // The cookie is only accessible by the web server
    secure: false, // set ssecure to be false
    sameSite: 'None',
  };
  res.cookie('SessionID', token, options); // set the token to response header, so that the client sends it back on each subsequent request
  return res.status(201).json(
    new ApiResponse(
      200,
      {
        user: loggedInUser,
        token,
      },
      'User Login successfull'
    )
  );
});

const logoutUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      accessToken: null,
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: false, // set ssecure to be false
  };
  return res
    .status(200)
    .clearCookie('SessionID', options)
    .json(new ApiResponse(200, {}, 'User logged Out'));
});

const verifyUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select(
    '-email -password -accessToken -createdAt -updatedAt'
  );
  if(!user) {
    throw new ApiError(411, 'User not found');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, 'Authenticated User'));
});

// changePassword logic is left

export { signUpUser, loginUser, logoutUser, getAllUser, verifyUser, getReceiver };
