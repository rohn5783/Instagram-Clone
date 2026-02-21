import express from "express";
import connectDB from "../config/database.js";
import authRouter from "../routes/auth.routes.js";
import cookieParser from "cookie-parser";
import postRouter  from "../routes/post.routes.js";
import userRouter from "../routes/user.routes.js";
import cors from "cors";




const app = express();


app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Matches your React app's origin
  credentials: true,               // Allows cookies/headers to be sent
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
}));
connectDB();

// app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);



export default app;
