// server.js
const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connect");
const Registration = require("./models/Registeration");
const nodemailer = require("nodemailer");
require("dotenv/config");

const app = express();

// Middleware
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow these HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
  })
);app.use(express.json());

// Connect to MongoDB
connectDB().catch((error) => {
  console.error("Failed to start server due to MongoDB connection error:", error);
});

// Email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Registration endpoint
app.post("/api/register", async (req, res) => {
  try {
    const newRegistration = new Registration(req.body);
    const savedRegistration = await newRegistration.save();
    res.status(201).json(savedRegistration);
  } catch (error) {
    console.error("Registration error:", error);
    res.status(400).json({ error: "Registration failed" });
  }
});

// Get all applications
app.get("/api/applications", async (req, res) => {
  try {
    const applications = await Registration.find();
    res.json(applications);
  } catch (error) {
    console.error("Fetch applications error:", error);
    res.status(500).json({ error: "Failed to fetch applications" });
  }
});

// Update application status
app.put("/api/applications/:id/status", async (req, res) => {
  try {
    const updatedApp = await Registration.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!updatedApp) {
      return res.status(404).json({ error: "Application not found" });
    }

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: updatedApp.email,
      subject: "Registration Status Update",
      text: `Your registration has been ${req.body.status.toLowerCase()}.`,
    };

    await transporter.sendMail(mailOptions);
    res.json(updatedApp);
  } catch (error) {
    console.error("Status update error:", error);
    res.status(400).json({ error: "Status update failed" });
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// Export the app for Vercel
module.exports = app;