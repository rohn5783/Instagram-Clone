import express from "express";
import connectDB from "../config/database.js";
import authRouter from "../routes/auth.routes.js";
import cookieParser from "cookie-parser";
import postRouter  from "../routes/post.routes.js";
import userRouter from "../routes/user.routes.js";




const app = express();


app.use(express.json());
connectDB();

// app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);



export default app;
