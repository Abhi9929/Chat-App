import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    accessToken: {
      type: String, 
    }
  });
  
  const User = mongoose.model('User', userSchema);

  export { User };