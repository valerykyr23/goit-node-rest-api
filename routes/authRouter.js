import express from "express";
import validateBody from "../helpers/validateBody.js";
import { loginSchema, registerSchema } from "../models/user.js";
import {
  login,
  register,
  getCurrent,
  logout,
} from "../controllers/authControllers.js";
import multer from "multer";
import autenticate from "../middlewars.js/autenticate.js";




const multerConfig = multer.diskStorage({
  destination: "../tmp",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage: multerConfig
});

const authRouter = express.Router();

authRouter.post("/register", upload.single("avatar"), validateBody(registerSchema), register);
authRouter.post("/login", validateBody(loginSchema), login);
authRouter.get("/current", autenticate, getCurrent);
authRouter.post("/logout", autenticate, logout);

export default authRouter;