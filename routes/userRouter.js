import express from "express";
import { uploadAvatar } from "../controllers/userControllers.js";
import autenticate from "../middlewars.js/autenticate.js";
import upload from "../middlewars.js/upload.js";

const userRouter = express.Router();


userRouter.patch("/avatars", autenticate, upload.single("avatar"), uploadAvatar);

export default userRouter;