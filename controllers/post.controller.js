import post from "../model/post.model.js";
import ImageKit from '@imagekit/nodejs';
import {toFile} from  "@imagekit/nodejs"



const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY // This is the default and can be omitted
});



async function createPostController(req,res){
console.log(req.body,req.file)

const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
})
res.send(file)
}






export default { createPostController };