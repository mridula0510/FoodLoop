// middleware/authMiddleware.js
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "devsecret";

const authMiddleware = {
  protected: (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ error: "Unauthorized" });
    const token = auth.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    try {
      const payload = jwt.verify(token, JWT_SECRET);
      req.user = payload;
      next();
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
  },

  optional: (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth) return next();
    const token = auth.split(" ")[1];
    if (!token) return next();
    try {
      req.user = jwt.verify(token, JWT_SECRET);
    } catch (e) {
      // ignore invalid token
    }
    next();
  }
};

export default authMiddleware;
