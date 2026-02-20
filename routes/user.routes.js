import express from "express";
import  userController from "../controllers/user.controller.js";
import identifyUser from "../middlewares/auth.middleware.js";
const userRouter = express.Router();




userRouter.post("/follow/:userName",identifyUser, userController.followController);
userRouter.delete("/unfollow/:userName",identifyUser, userController.unfollowController);

















export default userRouter;