import User from "../models/user.js"; 
import HttpError from "../helpers/HttpError.js"; 
import bcrypt from "bcrypt";
// const createHashPassword = async (password) => {
//   const result = await bcrypt.hash(password, 10);
//   console.log(result);
//   const compareResult = await bcrypt.compare(password, result );
//   console.log(compareResult);
// };

// createHashPassword("12345");


export const register = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    

    if (user) {
        throw HttpError(409, "Email is already in use");
    };
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({...req.body, password: hashPassword});
    res.json({
        email: newUser.email,
        name: newUser.name
    })
}