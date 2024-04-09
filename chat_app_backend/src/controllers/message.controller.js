import { asyncHandler } from '../utils/asyncHandler.js';
import zod from 'zod';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Message } from '../models/message.model.js';
import mongoose from 'mongoose';

const allMessage = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  let receiverId = req.params?.receiverId;
  receiverId = receiverId.replace(':', '');

  receiverId = new mongoose.Types.ObjectId(receiverId);
  // const messages = await Message.find({
  //   $and: [{ sender: userId }, { receiver: receiverId }],
  // });

  const messages = await Message.aggregate([
    {
      $match: {
        $and: [
          { $or: [{ sender: userId }, { receiver: userId }] }, // Messages sent or received by the user
          { $or: [{ sender: receiverId }, { receiver: receiverId }] }, // Messages sent or received by the receiver
        ],      
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'sender',
        foreignField: '_id',
        as: 'senderDetails',
      },
    },
    {
      $unwind: '$senderDetails',
    },
    {
      $lookup: {
        from: 'users',
        localField: 'receiver',
        foreignField: '_id',
        as: 'receiverDetails',
      },
    },
    {
      $unwind: '$receiverDetails',
    },
    {
      $project: {
        'senderDetails._id': 1,
        'senderDetails.username': 1,
        'receiverDetails._id': 1,
        'receiverDetails.username': 1,
        content: 1,
        createdAt: 1,
      },
    },
  ]);

  if (!messages) {
    throw new ApiError(411, 'Invalid User');
  }

  return res.json(new ApiResponse(200, messages, 'All chat'));
});

const messageSchema = zod.object({
  content: zod.string().min(1, { message: 'enter at least 1 word' }),
});
const newMessage = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const response = messageSchema.safeParse({
    content: req.body.content,
  });
  if (!response.success) {
    throw new ApiError(401, response.error);
  }
  console.log(userId);
  const message = await Message.create({
    content: req.body.content,
    sender: userId,
    receiver: req.body.receiverId,
  });

  return res.json(
    new ApiResponse(201, message, 'message created successfully')
  );
});

/*
const updateschema = zod.object({
  _id: zod.string(),
  title: zod.string().min(1).optional(),
  completed: zod.boolean().optional(),
});
const updateTodo = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { _id, title, completed } = req.body;

  const { success } = updateschema.safeParse({
    _id,
    title,
    completed,
  });
  if (!success) {
    throw new ApiError(401, "Invalid format");
  }

  const updateFields = { title };

  if (completed !== undefined) {
    updateFields.completed = !completed;
  }
  const updatedTodo = await Todo.findOneAndUpdate(
    {
      $and: [{ creater: userId }, { _id }],
    },
    {
      $set: updateFields,
    },
    {
      new: true,
    }
  ).select("-creater -accessToken");
  if (!updatedTodo) {
    throw new ApiError(401, "Unable to update");
  }
  return res.json(new ApiResponse(200, updatedTodo, "Todo updated"));
});
*/

const deleteMessage = asyncHandler(async (req, res) => {
  let messageId = req.params?.messageId;
  messageId = messageId.replace(':', '');
  await Message.findByIdAndDelete(messageId);

  const userId = req.user._id;

  const remainingMessage = await Message.find({
    $and: [
      {
        sender: userId,
      },
      {
        receiver: req.body.receiverId,
      },
    ],
  });

  if (!remainingMessage) {
    throw new ApiError(401, 'Error occurs while fetching todos');
  }

  return res.json(new ApiResponse(200, remainingMessage, 'Remaining Messages'));
});

export { allMessage, newMessage, deleteMessage };
