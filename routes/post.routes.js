import express from "express";
import postController from   "../controllers/post.controller.js";
import multer from "multer";
const upload = multer({storage: multer.memoryStorage()});
const postRouter = express.Router();

//  post api

postRouter.post("/",upload.single("profile"), postController.createPostController);




export default postRouter;