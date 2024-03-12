import HttpError from "../helpers/HttpError.js";
import jsonwebtoken from "jsonwebtoken";
const SECRET_KEY = process.env.SECRET_KEY;
import User from "../models/user.js";

const autenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401));
  }

  try {
    const { id } = jsonwebtoken.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      next(HttpError(401));
    }
    req.user = user;
    next();
  } catch {
    next(HttpError(401));
  }
};

export default autenticate;