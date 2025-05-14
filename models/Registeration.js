const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  title: String,
  firstName: String,
  surname: String,
  organization: String,
  jobDesignation: String,
  headquarters: String,
  category: String,
  mode: String,
  networking: [String],
  email: String,
  phoneNumber: String, // Added phone number field
  status: { type: String, default: "PENDING" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Registration", registrationSchema);