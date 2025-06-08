import mongoose, { Schema } from "mongoose";

const ownerSchema = new Schema(
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
    products: {
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
    // gstin - String
    gstin: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Owner = mongoose.model("Owner", ownerSchema);
