// controllers/userController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "devsecret";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    let user;
    if (User && User.create) {
      user = await User.create({ name, email, password: hash });
    } else {
      user = { id: "local-user", name, email };
    }
    res.status(201).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = null;
    if (User && User.findOne) {
      user = await User.findOne({ email });
      if (!user) return res.status(400).json({ success: false, error: "Invalid credentials" });
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(400).json({ success: false, error: "Invalid credentials" });
    } else {
      user = { id: "local-user", email, name: "Demo" };
    }

    const token = jwt.sign({ id: user._id || user.id, email: user.email }, JWT_SECRET, { expiresIn: "1d" });
    return res.json({ success: true, token });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
