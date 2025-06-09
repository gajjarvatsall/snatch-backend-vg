import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import index from "./routes/index.js"; 
import ownerRouter from "./routes/ownerRouter.js"; 
import userRouter from "./routes/userRouter.js"; 
import productRouter from "./routes/productRouter.js"; 
import db from "./config/mongoose.connect.js"; 
import dotenv from "dotenv";
import expressSession from "express-session";
import flash from "connect-flash";


dotenv.config({
  path: "./.env",
});


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/", index);
app.use("/owners", ownerRouter);
app.use("/user", userRouter);
app.use("/products", productRouter);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
