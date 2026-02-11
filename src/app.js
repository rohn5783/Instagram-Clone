import express from "express";
import connectDB from "../config/database.js";
import authRouter from "../routes/auth.routes.js";
import cookieParser from "cookie-parser";

const app = express();


app.use(express.json());
connectDB();

// app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRouter);

const cookieParserMiddleware = cookieParser();




export default app;