import { Router } from "express";
import {
  createLink,
  Login,
  Signin,
} from "../../controllers/user/user.controller.js";
import { verifyJwt } from "../../middlewares/auth.middeware.js";
const router = Router();

router.route("/login").post(Login);
router.route("/signin").post(Signin);

router.route("/user").post(verifyJwt, createLink);

export default router;
