import { User } from "../../model/user.model.js";
import bcrypt from "bcrypt";
import { apiResponse } from "../../utils/apiResponce.js";

const generateAcessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    return { accessToken, refreshToken };
  } catch (error) {
    res.status.send(
      new apiResponse(
        "Something went wrong while generating Acess and refresh token",
        500
      )
    );
  }
};

export const Login = async (req, res) => {
  const { userName, password } = req.body;

  if (!(userName && password)) {
    return res.status(403).send("email and password is required");
  }
  try {
    const user = await User.findOne({ userName: userName });
    if (!user) {
      return res.status(404).send(new apiResponse("User Not Found", 404));
    }
    const isCorrectPassword = await user.verifyPassword(password);
    if (!isCorrectPassword) {
      return res.status(401).send(new apiResponse("Invalid Password", 401));
    }
    const { accessToken, refreshToken } = await generateAcessAndRefreshToken(
      user._id
    );
    const logedInUser = await User.findById(user._id).select("-password");
    return res
      .cookie("token", refreshToken, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
        samesite: "none",
      })
      .status(200)
      .json(
        new apiResponse("login sucessful", 200, {
          user: logedInUser,
          accessToken,
        })
      );
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

export const Logout = async (req, res) => {
  const user = req.user;
  return res
    .clearCookie("token", {
      httpOnly: true,
    })
    .status(200)
    .send("logout");
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

export const CheckLogedIn = async (req, res) => {
  try {
    const user = req.user;

    const { accessToken } = await generateAcessAndRefreshToken(user._id);

    return res
      .status(200)
      .json(new apiResponse("user logedin", 200, { user: user, accessToken }));
  } catch (error) {
    console.log(error);
  }
};

export const RefreshAccessToken = async (req, res) => {
  const user = req.user;

  try {
    const { accessToken } = await generateAcessAndRefreshToken(user._id);
    return res.status(200).send(accessToken);
  } catch (error) {
    console.log(error);
  }
};

export const FindUsername = async (req, res) => {
  const { username } = req.headers;
  if (!username) {
    return res
      .status(400)
      .send(new apiResponse("all feilds are required", 400));
  }
  try {
    const userExist = await User.findOne({ userName: username });
    if (userExist === null) {
      return res.status(200).json(
        new apiResponse("username avilabel", 200, {
          avilable: true,
          username: username,
        })
      );
    }
    return res.status(200).json(
      new apiResponse("username not avilabel", 200, {
        avilable: false,
      })
    );
  } catch (error) {
    console.log(error);
  }
};
