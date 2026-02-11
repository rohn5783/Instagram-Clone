
import User from "../model/user.model.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";

async function registerController(req, res) {
  const { userName, email, password, bio, profile_Img } = req.body;

  User({ userName, email, password, bio, profile_Img });
  const isUserExists = await User.findOne({
    $or: [{ userName }, { email }],
  });
  if (isUserExists) {
    return res.status(409).json({
      message:
        "User  already exists " +
        (isUserExists.email
          ? "Email already exists"
          : "Username already exists"),
    });
  }
  const hash = crypto.createHash("sha256").update(password).digest("hex");
  const user = await User.create({
    userName,
    email,
    password: hash,
    bio,
    profile_Img,
  });
  return res
    .status(201)
    .json({ message: "User registered successfully", user });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );
  res.cookie("token", token);
  res.status(201).json({
    message: "User registered successfully",
    user: {
      userName: user.userName,
      email: user.email,
      profile_Img: user.profile_Img,
      bio: user.bio,
      token: token,
    },
  });
}

async function loginController (req, res)  {
  const user = await User.findOne({
    $or: [
      {
        email: req.body.email,
      },
      {
        userName: req.body.userName,
      },
    ],
  });
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  const hash = crypto
    .createHash("sha256")
    .update(req.body.password)
    .digest("hex");
  const isPasswordCorrect = (await user.password) === hash;
  if (!isPasswordCorrect) {
    return res.status(401).json({
      message: "Invalid password",
    });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.cookie("token", token);
  res.status(200).json({
    message: "User logged in successfully",
    user: {
      userName: user.userName,
      email: user.email,
      profile_Img: user.profile_Img,
      bio: user.bio,
      token: token,
    },
  });
}


export default { registerController, loginController };