import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import dotenv from "dotenv";

export const isLoggedIn = async (req, res, next) => {
  if (!req.cookies.token) {
    req.flash({ error: "You need to login first" });
    return res.status(401).redirect("/");
  }
  console.log("token found");

  try {
    let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    let userDB = await User.findOne({ _id: decoded.id });
    req.user = userDB;
    next();
  } catch (err) {
    req.flash(err.message);
    req.redirect("/");
  }
};

