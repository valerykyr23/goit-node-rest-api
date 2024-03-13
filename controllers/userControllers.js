import HttpError from "../helpers/HttpError.js";
import User from "../models/user.js";
import * as fs from "node:fs/promises";
import * as path from "node:path";


export const uploadAvatar = async (req, res, next) => {
    try {
        await fs.rename(req.file.path, path.join(process.cwd(), "public/avatars", req.file.filename
    ));
        const user = await User.findByIdAndUpdate(req.user.id, { avatarURL: req.file.filename }, { new: true });
    if (user === null) {
        throw HttpError(404, "User not found");
        };

        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }

    
};