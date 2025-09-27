import express from "express";
import Profile from "../models/Profile.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// JWT authentication middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// GET profile
router.get("/", authMiddleware, async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.userId });
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// CREATE or UPDATE profile
router.post("/", authMiddleware, async (req, res) => {
  try {
    const data = { ...req.body, userId: req.userId };

    let profile = await Profile.findOne({ userId: req.userId });
    if (profile) {
      profile = await Profile.findOneAndUpdate({ userId: req.userId }, data, { new: true });
    } else {
      profile = new Profile(data);
      await profile.save();
    }

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// PUT profile (update)
router.put("/", authMiddleware, async (req, res) => {
  try {
    const updatedProfile = await Profile.findOneAndUpdate(
      { userId: req.userId },  // use userId to match schema
      req.body,
      { new: true, upsert: true } // create if not exists
    );
    res.json(updatedProfile);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
