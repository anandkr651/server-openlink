import { Router } from "express";
import { getallUrls } from "../controllers/public.controller.js";

const router = Router();

router.route("/:userName").get(getallUrls);

export default router;
