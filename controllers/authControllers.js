import User from "../models/user.js";
import HttpError from "../helpers/HttpError.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import "dotenv/config";
const SECRET_KEY = process.env.SECRET_KEY;
import gravatar from "gravatar";
import nodemailer from "nodemailer";
import crypto from "node:crypto";


const { MAILTRAP_PASSWORD, MAILTRAP_USER } = process.env;



const  transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: MAILTRAP_USER,
    pass: MAILTRAP_PASSWORD
  }
});


// transport.sendMail(email)
//     .then(() => console.log("Email was sent successfully!"))
//     .catch(error => console.log(error.message));


export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const userAvatar = gravatar.url(
      `${email}`,
      { s: "100", r: "x", d: "retro" },
      false
    );

    if (user) {
      throw HttpError(409, "Email  in use");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomUUID();

    await transport.sendMail({
      to: email,
      from: "valeranicus@gmail.com",
      subject: "Verify Email",
      html: `Please verify your email by clicking on the <a href="http://localhost:8080/users/verify/${verificationToken}"> email verification link</a>`,
      text: `To confirm your email, please click on the link http://localhost:8080/users/verify/${verificationToken}`
    });

    const newUser = await User.create({
      ...req.body,
      verificationToken,
      password: hashPassword,
      avatarURL: userAvatar,
    });
    res.json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Email or password is wrong");
    }

    const payload = {
      id: user._id,
    };

    if (user.verify === false) {
      throw HttpError(401, "Your email is not verified");
    }

    const token = jsonwebtoken.sign(payload, SECRET_KEY, { expiresIn: "7d" });
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrent = async (req, res, next) => {
  try {
    const { subscription, email } = req.user;
    res.json({
      email,
      subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: null });
    res.status(204).json({
      message: "No Content",
    });
  } catch (error) {
    next(error);
  }
};

export const verify = async (req, res, next) => {

  const {token} = req.params;

  try {
    const user = await User.findOne({ verificationToken: token });
    if (user === null) {
      throw HttpError(404, "Not found");
    };

   await  User.findByIdAndUpdate(user._id, {verify: true, verificationToken: null})
    res.status(200).json("Verification successful");
   }
  catch (error) {
    next(error);
  }
  
};