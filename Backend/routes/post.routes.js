import express from "express";
const postRouter = express.Router();

import postController from "../controllers/post.controller.js";
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });
import identifyUser from "../middlewares/auth.middleware.js";

postRouter.post(
  "/",
  upload.single("image"),identifyUser,
  postController.createPostController,
);
postRouter.get("/",identifyUser, postController.getPostController);

postRouter.post("/like/:postId", identifyUser, postController.likePostController);


postRouter.get("/:postId", identifyUser, postController.getFeedController);



export default postRouter;
