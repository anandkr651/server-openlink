import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";

const verifyAccessToken = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(403).send("no token");
  }
  try {
    const decodedToken = await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      async function (error, decode) {
        if (error) {
          return res.status(403).send("token expire");
        }
        const user = await User.findById(decode._id).select("-password");
        if (!user) {
          return res.status(401).send("invalid token");
        }
        req.user = user;
        next();
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const verifyRefreshToken = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return (
      res
        // .cookie("token", "", {
        //   expires: new Date(Date.now() + 1000),
        //   httpOnly: true,
        // })
        .status(403)
        .send("no token")
    );
  }
  try {
    const decodedToken = await jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET
    );
    const user = await User.findById(decodedToken._id).select("-password");
    if (!user) {
      return res.status(403).send("invalid token");
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};

export { verifyAccessToken, verifyRefreshToken };
