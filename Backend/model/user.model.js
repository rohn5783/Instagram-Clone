import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "Username already exists"],
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    unique: [true, "Email already exists"],
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  bio: String,
  profile_Img: {
    type: String,
    default: "https://ik.imagekit.io/a4uu1ujnt/icons8-user-default-64.png",
  },
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  }],
});

const User = mongoose.model("Users", userSchema);
export default User;
