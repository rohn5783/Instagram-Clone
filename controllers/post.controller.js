import post from "../model/post.model.js";
import ImageKit from "@imagekit/nodejs";
import { toFile } from "@imagekit/nodejs";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
});

async function createPostController(req, res) {
  console.log(req.body, req.file);
const token = req.token;

if(!token) {
  res.status(401).json({ message: "Unauthorized access" });
}
const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
  });
  const post = await post.create({
    caption: req.body.caption,
    image: file.url,
    user: decoded.id,
  })
   res.status(201).json({message: "Post created successfully", post});
}

export default { createPostController };
