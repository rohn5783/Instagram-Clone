import Post from "../model/post.model.js";
import User from "../model/user.model.js";
import ImageKit from "@imagekit/nodejs";
import { toFile } from "@imagekit/nodejs";
import jwt from "jsonwebtoken";
import LikeModel from "../model/like.model.js";
// import User from "../model/user.model.js";
const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
  // const token = req.cookies.token;
  // if (!token) {
  //   res.status(401).send("Unauthorized user");
  // }
  // let decoded;
  // try {
  //   decoded = jwt.verify(token, process.env.JWT_SECRET);
  // } catch (err) {
  //   res.status(401).json({
  //     message: "Unauthorized user",
  //   });
  // }

  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer, "file")),
    fileName: "image",
    folder: "Instagram-Clone",
  });

  const post = await Post.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: req.user.id,
  });
  res.status(201).json({
    message: "Post created successfully",
    post,
  });
}

//  get all posts

async function getPostController(req, res) {
  // const token = req.cookies.token;
  // if (!token) {
  //   res.status(401).send("Unauthorized user");
  // }
  // let decoded;
  // try {
  //   decoded = jwt.verify(token, process.env.JWT_SECRET);
  // } catch (err) {
  //   res.status(401).json({
  //     message: "Unauthorized user",
  //   });
  // }

  const allPost = await Post.find({ user: req.user.id });
  res.status(200).json({
    message: "Posts fetched successfully",
    allPost,
  });
}
//  post like feature
async function likePostController(req, res) {
  const userName = req.user.username;
  const postId = req.params.postId;
  const post = await Post.findById(postId);
  if (!post) {
    res.status(404).json({
      message: "Post not found",
    });
  }
  const isLiked = await LikeModel.findOne({
    post: postId,
    user: userName,
  });
  if (isLiked) {
    return res.status(409).json({
      message: "You have already liked this post",
    });
  }

  const like = await LikeModel.create({
    post: postId,
    user: userName,
  });
  res.status(200).json({
    message: "post  Liked successfully",
    like,
  });
}

async function getFeedController(req, res){
  const posts = await Post.find().populate({
    path: "user",
    select: "-password",
  });


  res.status(200).json({
    message: "Posts fetched successfully",
    posts,
  });
}

export default { createPostController, getPostController, likePostController, getFeedController };
