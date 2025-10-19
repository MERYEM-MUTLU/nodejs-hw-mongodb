import express from "express";
import { validateBody } from "../middlewares/validateBody.js";
import { registerSchema, loginSchema } from "../validation/authSchemas.js";
import {
  registerController,
  loginController,
  refreshController,
  logoutController,
  getCurrentUserController,
} from "../controllers/auth.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = express.Router();

router.post("/register", validateBody(registerSchema), registerController);
router.post("/login", validateBody(loginSchema), loginController);
router.post("/refresh", refreshController);
router.get("/current", authenticate, getCurrentUserController);
router.post("/logout", authenticate, logoutController);

export default router;