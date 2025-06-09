import express from "express";
import { registerController, loginController, logoutController } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("User List");
});

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/logout", logoutController);

export default router;
