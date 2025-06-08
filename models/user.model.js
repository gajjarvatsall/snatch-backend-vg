// Importing required modules from mongoose
import mongoose, { Schema } from "mongoose";

// Define the User schema with all necessary fields and validation
const userScheme = new Schema(
  {
    // Full name - string
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    // Email -string
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    // Password - string
    password: {
      type: String,
      required: true,
    },
    // Cart - array
    cart: {
      type: Array,
      default: [],
    },
    // isadmin - boolean
    isadmin: {
      type: Boolean,
      default: false,
    },
    // Orders - array
    orders: {
      type: Array,
      default: [],
    },
    // Contact - number
    contact: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid contact number!`,
      },
    },
    // Picture - String
    picture: {
      type: String,
    },
  },
  { timestamp: true }
);

export const User = mongoose.model("User", userScheme);
