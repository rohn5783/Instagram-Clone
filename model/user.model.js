import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
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
  followers: Array,
});

const User = mongoose.model("Users", userSchema);
export default User;
