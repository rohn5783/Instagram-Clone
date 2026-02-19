import express from "express";
const postRouter = express.Router();

import postController from "../controllers/post.controller.js";
import multer from "multer";
const upload = multer({storage: multer.memoryStorage()});

postRouter.post("/",upload.single("image"), postController.createPostController);


export default postRouter;