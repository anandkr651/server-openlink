import { Router } from "express";
import {
  GetAllLinks,
  Create,
  DeactivateLink,
  DeleteLink,
  UpdateTitleAndLink,
} from "../../controllers/user/user.controller.js";
import { verifyAccessToken } from "../../middlewares/auth.middeware.js";
const router = Router();

router.route("/user").get(verifyAccessToken, GetAllLinks);
router.route("/create").post(verifyAccessToken, Create);
router.route("/update/:id").post(verifyAccessToken, UpdateTitleAndLink);
router.route("/offSwitch/:id").patch(verifyAccessToken, DeactivateLink);
router.route("/deleteurl/:id").delete(verifyAccessToken, DeleteLink);

export default router;
