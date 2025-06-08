import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    // Image
    image: {
      type: String,
      required: true,
      trim: true,
    },
    // Name
    name: {
      type: String,
      required: true,
      trim: true,
    },
    // Price
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    // Discount
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    // bgcolor
    bgcolor: {
      type: String,
      required: true,
      trim: true,
    },
    // panelcolor
    panelcolor: {
      type: String,
      required: true,
      trim: true,
    },
    // Textcolor
    textcolor: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema); 