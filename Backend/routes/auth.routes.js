import express from "express";
import authController from "../controllers/auth.controller.js";

import identifyUser from "../middlewares/auth.middleware.js";
const authRouter = express.Router();

//  post api request to register user

authRouter.post("/register", authController.registerController);

//  login api request to login user
authRouter.post("/login", authController.loginController);

authRouter.get("/get-me", identifyUser, authController.getMeController);

export default authRouter;
