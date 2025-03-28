import { verifyToken } from "../src/utils/session.js";

const sessionManager = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
  req.user = decoded;
  next();
};

export default sessionManager;
