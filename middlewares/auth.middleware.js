import jwt from "jsonwebtoken";

async function identifyUser(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).send("Unauthorized user");
  }
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    res.status(401).json({
      message: "Unauthorized user",
    });
  }
  req.user = decoded;
  next();
}


export default  identifyUser ;
