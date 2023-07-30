import { Link } from "../../model/links.model.js";
import { metaData } from "../../utils/getMetaData.js";
import { User } from "../../model/user.model.js";
import bcrypt from "bcrypt";

export const Login = async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    return res.status(403).send("email and password is required");
  }

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).send("no user found");
    }
    const isCorrectPassword = await user.verifyPassword(password);
    if (!isCorrectPassword) {
      return res.status(400).send("password not match");
    }
    const token = user.generateToken();
    user.password = undefined;
    res.cookie(token);
    res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);
  }
};

export const Signin = async (req, res) => {
  const { userName, email, password } = req.body;
  if (!(userName && email && password)) {
    return res.status(401).send("all feilds are reuired");
  }
  try {
    const ExistingUser = await User.findOne({ userName });
    if (ExistingUser) {
      return res.status(400).send("username allready exist");
    }
    const hasPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      userName,
      email,
      password: hasPassword,
    });
    res.status(200).send("USER Created");
  } catch (error) {
    console.log(error);
  }
};

export const createLink = async (req, res) => {
  const { url } = req.body;
  const user = req.user;
  if (!url) {
    return res.status(403).send("NO EMAIL FOUND");
  }
  try {
    const { title, image, icon } = await metaData(url);
    const link = await Link.create({
      title,
      url,
      image: image || icon,
      userId: user._id,
    });
    res.status(200).json({ msg: "link created", link: link });
  } catch (error) {
    console.log(error);
  }
};
