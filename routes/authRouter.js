import express from "express";
import validateBody from "../helpers/validateBody.js";
import { loginSchema, registerSchema } from "../models/user.js";
import {
  login,
  register,
  getCurrent,
  logout,
} from "../controllers/authControllers.js";
import autenticate from "../middlewars.js/autenticate.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerSchema), register);
authRouter.post("/login", validateBody(loginSchema), login);
authRouter.get("/current", autenticate, getCurrent);
authRouter.post("/logout", autenticate, logout);

export default authRouter;
