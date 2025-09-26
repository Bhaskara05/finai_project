import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Profile from "../models/Profile.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, contact } = req.body;

    // Check if email exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already registered" });
    if (!name || !email || !password) return res.status(400).json({ message: "Missing required fields" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({ name, email, password: hashedPassword, contact });
    await newUser.save();

    // Create default profile for the new user
    const defaultProfile = new Profile({
      userId: newUser._id,
      name: newUser.name,
      email: newUser.email,
      contactNumber: contact || "",
      gender: "other",
      bankName: "",
      state: "",
      location: "",
      monthlyIncome: "0",
      financialGoals: "",
      riskTolerance: "medium",
      familyDependents: "0",
      existingLiabilities: "",
      investmentInterests: "",
      lifestyleHabits: ""
    });
    await defaultProfile.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


export default router;
