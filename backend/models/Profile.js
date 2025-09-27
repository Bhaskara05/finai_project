import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  contactNumber: { type: String },
  gender: { type: String },
  age: { type: String },
  maritalStatus: { type: String },
  education: { type: String },
  bankName: { type: String },
  state: { type: String },
  location: { type: String },
  monthlyIncome: { type: String },
  currentProfits: { type: String },
  financialGoals: { type: String },
  riskTolerance: { type: String },
  familyDependents: { type: String },
  existingLiabilities: { type: String },
  investmentInterests: { type: String },
  lifestyleHabits: { type: String },
}, { timestamps: true });

export default mongoose.model("Profile", profileSchema);
