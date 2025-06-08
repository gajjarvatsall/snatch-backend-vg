// const express = require("express");
import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import ownerRouter from "./routes/ownerRouter.js"; // Assuming ownerRouter.js is in the routes directory
import userRouter from "./routes/userRouter.js"; // Assuming userRouter.js is in the routes directory
import productRouter from "./routes/productRouter.js"; // Assuming productRouter.js is in the routes directory
import db from "./config/mongoose.connect.js"; // Assuming db.js is in the same directory

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

app.use("/owners", ownerRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
