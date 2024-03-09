import User from "../models/user.js"; 
import HttpError from "../helpers/HttpError.js"; 
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import "dotenv/config";
const SECRET_KEY = process.env.SECRET_KEY;

export const register = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    

    if (user) {
        throw HttpError(409, "Email is already in use");
    };
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ ...req.body, password: hashPassword });
    res.json({
        email: newUser.email,
        name: newUser.name
    })
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401, "Email or password is invalid");
    };

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, "Email or password is invalid");
    };

    const payload = {
    id: user._id,
};

    const token = jsonwebtoken.sign(payload, SECRET_KEY, { expiresIn: "7d" }); 
    
    res.json({
        token,
    })
};