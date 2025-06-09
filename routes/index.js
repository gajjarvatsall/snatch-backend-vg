import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { title: "Home Page" });
});




export default router;
