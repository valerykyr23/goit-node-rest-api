import mongoose from "mongoose";
const { Schema, model } = mongoose;
import Joi from "joi";
import handleMongooseError from "../helpers/mongooseError.js";

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        match: emailRegexp,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: true
    },
    token: {
    type: String,
    default: null,
  },
}, { versionKey: false, timestamps: true });


userSchema.post("save", handleMongooseError);

export const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),

});

export const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),

});


const User = model("user", userSchema);

export default User;