import { Router } from "express";
import {
  verifyRefreshToken,
  verifyAccessToken,
} from "../../middlewares/auth.middeware.js";
import {
  Login,
  Logout,
  Signin,
  FindUsername,
  CheckLogedIn,
  RefreshAccessToken,
} from "../../controllers/auth/auth.controller.js";
const router = Router();

router.route("/login").post(Login);
router.route("/logout").post(verifyAccessToken, Logout);
router.route("/signin").post(Signin);
router.route("/findUsername").get(FindUsername);
router.route("/verify").get(verifyRefreshToken, CheckLogedIn);
router.route("/refreshToken").get(verifyRefreshToken, RefreshAccessToken);

export default router;
