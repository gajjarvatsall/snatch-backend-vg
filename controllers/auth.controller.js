import bcrypt from "bcrypt";
import { User } from "../models/user.model.js"; // Assuming user.model.js is in the models directory
import genrateToken from "../utils/genrateToken.js"; // Assuming genrateToken.js is in the utils directory
import flash from "connect-flash"; // Assuming you are using connect-flash for flash messages
export const registerController = async (req, res) => {
  try {
    const { fullname, email, password, contact } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send("User with this email already exists");
    }

    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        console.error("Error generating salt:", err);
        return res.status(500).send("Internal Server Error");
      }
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
          return res.status(500).send("Internal Server Error");
        }
        try {
          let user = await User.create({
            fullname,
            email,
            password: hash,
            contact,
          });

          let token = genrateToken(user);
          res.send({ token, user });
        } catch (dbErr) {
          if (dbErr.code === 11000) {
            req.flash("message", "This email is already registered");
            res.redirect("/");
          }
          console.error("Error creating user:", dbErr);
          res.status(500).send("Internal Server Error");
        }
      });
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("Email or password is incorrect");
    }
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        req.flash("message", "Email or password is incorrect");
        res.redirect("/");
      }
      if (!isMatch) {
        req.flash("message", "Email or password is incorrect");
        res.redirect("/");
      } else {
        // Generate token
        const token = genrateToken(user);
        res.cookie("token", token);
        // Render shop.ejs with user and token
        res.render("shop", {
          title: "Shop Page",
          user: user,
          token: token,
          products: [], // Pass an empty array or fetch products from DB if available
        });
      }
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).send("Internal Server Error");
  }
};

export const logoutController = (req, res) => {
  req.flash("message", "LogeedOut successfully");
  res.clearCookie("token").redirect("/");
};
