import express from "express";
const router = express.Router();
import { Owner } from "../models/owner.model.js";

if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    let owners = await Owner.find();
    if (owners.length > 0) {
      return res.status(503).send("Owner already exists");
    }
    let { fullname, email, password, contact } = req.body;

    let createdOwner = await Owner.create({
      fullname,
      email,
      password,
      contact,
    });
    res.send(createdOwner);
  });
}

router.get("/admin", (req, res) => {
  res.render("createproducts", { success: "" }); // or use [] if your template expects an array
});

export default router;
