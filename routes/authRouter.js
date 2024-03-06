import express from "express";
import validateBody from "../helpers/validateBody.js";
import { registerSchema } from "../models/user.js";
import { register } from "../controllers/authControllers.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerSchema), register);

export default authRouter;