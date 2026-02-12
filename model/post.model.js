import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        default: ""

    },
    imgUrl: {
        type: String,
        required: [true, "img url is required "]
    },

})

const Post = mongoose.model("Posts", postSchema)

export default Post