import express from "express";
import authController from "../controllers/auth.controller.js";

const authRouter = express.Router();

//  post api request to register user

authRouter.post("/register", authController.registerController);

//  login api request to login user
authRouter.get("/login", authController.loginController); 

export default authRouter;
