import HttpError from "../helpers/HttpError.js";
import User from "../models/user.js";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import Jimp from "jimp";

export const uploadAvatar = async (req, res, next) => {
  try {
    await Jimp.read(req.file.path).then((img) =>
      img.resize(250, 250).write(`${req.file.path}`)
    );

    await fs.rename(
      req.file.path,
      path.join(process.cwd(), "public/avatars", req.file.filename)
    );
    const avatarAddress = path.join(
      process.cwd(),
      "public/avatars",
      req.file.filename
    );
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatarURL: avatarAddress },
      { new: true }
    );
    if (user === null) {
      throw HttpError(404, "User not found");
    }

    res.status(200).json({
      avatarURL: avatarAddress,
    });
  } catch (error) {
    next(error);
  }
};