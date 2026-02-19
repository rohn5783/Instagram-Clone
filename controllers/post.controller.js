import Post from "../model/post.model.js";
import ImageKit from "@imagekit/nodejs";
import { toFile } from "@imagekit/nodejs";
import jwt from "jsonwebtoken";
const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
  console.log(req.body, req.file);

  const token = req.cookies.token;
  if (!token) {
    res.status(401).send("Unauthorized");
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  

  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer, "file")),
    fileName: "image",
    folder: "Instagram-Clone"
  })
  
  const post  = await Post.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: decoded.id
  })
  res.status(201).json({
    message: "Post created successfully",
    post
  });
}

export default { createPostController };
