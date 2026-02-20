import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* =========================
   REGISTER CONTROLLER
========================= */
export async function registerController(req, res) {
  try {
    const { userName, email, password, bio, profile_Img } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json({
        message: "Username, email and password are required",
      });
    }

    // Check if user already exists
    const isUserExists = await User.findOne({
      $or: [{ userName }, { email }],
    });

    if (isUserExists) {
      return res.status(409).json({
        message:
          isUserExists.email === email
            ? "Email already exists"
            : "Username already exists",
      });
    }

    // Hash password
    const hash = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      userName,
      email,
      password: hash,
      bio,
      profile_Img,
    });

    // Generate token
    const token = jwt.sign(
      { id: user._id,
        userName: user.userName,
       },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production (HTTPS)
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        bio: user.bio,
        profile_Img: user.profile_Img,
      },
      token,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}

/* =========================
   LOGIN CONTROLLER
========================= */
export async function loginController(req, res) {
  try {
    const { email, userName, password } = req.body;

    const user = await User.findOne({
      $or: [{ email }, { userName }],
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      { id: user._id,
        userName: user.userName,
       },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production
    });

    return res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        bio: user.bio,
        profile_Img: user.profile_Img,
      },
      token,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}

export default { registerController, loginController };