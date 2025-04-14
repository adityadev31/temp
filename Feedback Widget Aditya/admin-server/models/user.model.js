const mongoose = require("mongoose");

// User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("user", userSchema);

class User {
    createUser = async (data) => {
      const user = new userModel(data);
      return await user.save();
    };
  
    getUserById = async (userId) => {
      return await userModel.findById(userId);
    };
  
    getUserByEmail = async (email) => {
      return await userModel.findOne({ email });
    };
  
    getAllUsers = async () => {
      return await userModel.find();
    };
  
    updateUserById = async (userId, data) => {
      return await userModel.findByIdAndUpdate(userId, data, { new: true });
    };
  
    deleteUserById = async (userId) => {
      return await userModel.findByIdAndDelete(userId);
    };
  }
  
  module.exports = new User();