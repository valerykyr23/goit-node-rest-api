import express from "express";
import validateBody from "../helpers/validateBody.js";
import { loginSchema, registerSchema } from "../models/user.js";
import {
  login,
  register,
  getCurrent,
  logout,
  verify
} from "../controllers/authControllers.js";
import autenticate from "../middlewars.js/autenticate.js";
import { uploadAvatar } from "../controllers/userControllers.js";
import upload from "../middlewars.js/upload.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerSchema), register);

authRouter.post("/login", validateBody(loginSchema), login);

authRouter.get("/current", autenticate, getCurrent);

authRouter.post("/logout", autenticate, logout);

authRouter.patch("/avatars", autenticate, upload.single("avatar"), uploadAvatar);

authRouter.get("/verify/:token", verify);

export default authRouter;