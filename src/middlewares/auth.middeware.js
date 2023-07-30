import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";

export const verifyJwt = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(403).send("no token");
  }
  try {
    const decodedToken = await jwt.verify(token, "aditya");
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
