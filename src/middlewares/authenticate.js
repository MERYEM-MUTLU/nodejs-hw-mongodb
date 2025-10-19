import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import { User } from "../db/models/User.js";

const SECRET = process.env.JWT_SECRET || "supersecretjwtkey";

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw createHttpError(401, "Authorization header missing");

    const [bearer, token] = authHeader.split(" ");
    if (bearer !== "Bearer" || !token)
      throw createHttpError(401, "Invalid authorization format");

    const decoded = jwt.verify(token, SECRET);
    const user = await User.findById(decoded.id);
    if (!user) throw createHttpError(401, "User not found");

    req.user = user;
    next();
  } catch (error) {
    next(createHttpError(401, error.message));
  }
};
