import express from "express";
import postController from   "../controllers/post.controller.js";
import multer from "multer";
const postRouter = express.Router();

//  post api

postRouter.post("/", postController.createPostController);




export default postRouter;