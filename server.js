

// // server.js
// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./db/connect");
// const Registration = require("./models/Registeration");
// const nodemailer = require("nodemailer");
// require("dotenv/config");

// const app = express();

// // Middleware
// const allowedOrigins = [
 
//   'http://localhost:3000',
//   'http://localhost:3001',
//   'https://pbrsummit.vercel.app'
// ];

// app.use(cors({
//   origin: (origin, callback) => {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true
// }));


// // Middleware
// app.use(
//   cors({
//     origin: "*", // Allow all origins
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );
// app.use(express.json());

// // Connect to MongoDB
// connectDB().catch((error) => {
//   console.error("Failed to start server due to MongoDB connection error:", error);
// });

// // Email transporter
// const transporter = nodemailer.createTransport({
//   host: process.env.EMAIL_HOST,
//   port: process.env.EMAIL_PORT,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // Email templates with HTML
// const emailTemplates = {
//   approvalAttendee: (name) => ({
//     subject: "Confirmation of Invitation – 2025 Nigeria Pharmaceutical Industry Growth and Investment Summit",
//     text: `Dear ${name},\n\nOn behalf of the 2025 Pharma Growth and Investment Summit Team, we are pleased to confirm your exclusive invitation to the inaugural Nigeria Pharmaceutical Industry Growth and Investment Summit on May 22, 2025.\n\nAs a CEO of an organization within Nigeria’s pharmaceutical or healthcare value chain, your participation will be instrumental in shaping the future of Africa’s largest pharma market. This closed-door summit offers unparalleled opportunities to:\n- Engage directly with industry pioneers and government stakeholders.\n- Connect with strategic investors to explore new capital opportunities.\n- Access first-mover insights into investment and regulatory trends.\n- Collaborate on innovative strategies to drive growth across the sector.\n\nProgram Timing: 10:00 AM – 1:00 PM WAT. A detailed agenda and venue will be shared in a follow-up email.\n\nWe look forward to your participation.\n\nBest regards,\nThe 2025 Pharma Growth and Investment Summit Team`,
//     html: `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
//         <!-- Header -->
//         <div style="background-color: #013983; padding: 20px; text-align: center; color: white;">
//           <h1 style="margin: 0; font-size: 24px;">2025 Nigeria Pharmaceutical Industry Growth and Investment Summit</h1>
//         </div>

//         <!-- Body -->
//         <div style="padding: 20px; background-color: white; border: 1px solid #e0e0e0;">
//           <h2 style="color: #013983; font-size: 20px;">Dear ${name},</h2>
//           <p style="color: #333; line-height: 1.6;">
//             On behalf of the 2025 Pharma Growth and Investment Summit Team, we are pleased to confirm your exclusive invitation to the inaugural Nigeria Pharmaceutical Industry Growth and Investment Summit on <strong>May 22, 2025</strong>.
//           </p>
//           <p style="color: #333; line-height: 1.6;">
//             As a CEO of an organization within Nigeria’s pharmaceutical or healthcare value chain, your participation will be instrumental in shaping the future of Africa’s largest pharma market. This closed-door summit offers unparalleled opportunities to:
//           </p>
//           <ul style="color: #333; line-height: 1.6; padding-left: 20px;">
//             <li>Engage directly with industry pioneers and government stakeholders.</li>
//             <li>Connect with strategic investors to explore new capital opportunities.</li>
//             <li>Access first-mover insights into investment and regulatory trends.</li>
//             <li>Collaborate on innovative strategies to drive growth across the sector.</li>
//           </ul>
//           <p style="color: #333; line-height: 1.6;">
//             <strong>Program Timing:</strong> 10:00 AM – 1:00 PM WAT. A detailed agenda and venue will be shared in a follow-up email.
//           </p>
//           <p style="color: #333; line-height: 1.6;">
//             We look forward to your participation.
//           </p>
//         </div>

//         <!-- Footer -->
//         <div style="padding: 20px; text-align: center; color: #666; font-size: 14px;">
//           <p>Best regards,<br>The 2025 Pharma Growth and Investment Summit Team</p>
//           <p>Contact us at: <a href="mailto:info@pharmasummit2025.com" style="color: #013983;">info@pharmasummit2025.com</a></p>
//         </div>
//       </div>
//     `,
//   }),

//   approvalInvestor: (name) => ({
//     subject: "Investor Invitation Confirmed – 2025 Nigeria Pharmaceutical Growth Summit",
//     text: `Dear ${name},\n\nThe 2025 Pharma Growth and Investment Summit Team is delighted to confirm your acceptance as a high-profile investor at the Nigeria Pharmaceutical Industry Growth and Investment Summit on May 22, 2025.\n\nYour role as a strategic capital partner positions you at the forefront of Africa’s most promising healthcare market. This summit will enable you to:\n- Secure first-mover access to high-potential pharma ventures.\n- Network with Nigerian pharmaceutical CEOs and development finance leaders.\n- Gain exclusive insights into regulatory and market trends shaping the sector.\n\nProgram Timing: 10:00 AM – 1:00 PM WAT. A detailed agenda and venue will be shared in a follow-up email.\n\nWe look forward to your participation.\n\nBest regards,\nThe 2025 Pharma Growth and Investment Summit Team`,
//     html: `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
//         <!-- Header -->
//         <div style="background-color: #013983; padding: 20px; text-align: center; color: white;">
//           <h1 style="margin: 0; font-size: 24px;">2025 Nigeria Pharmaceutical Industry Growth and Investment Summit</h1>
//         </div>

//         <!-- Body -->
//         <div style="padding: 20px; background-color: white; border: 1px solid #e0e0e0;">
//           <h2 style="color: #013983; font-size: 20px;">Dear ${name},</h2>
//           <p style="color: #333; line-height: 1.6;">
//             The 2025 Pharma Growth and Investment Summit Team is delighted to confirm your acceptance as a high-profile investor at the Nigeria Pharmaceutical Industry Growth and Investment Summit on <strong>May 22, 2025</strong>.
//           </p>
//           <p style="color: #333; line-height: 1.6;">
//             Your role as a strategic capital partner positions you at the forefront of Africa’s most promising healthcare market. This summit will enable you to:
//           </p>
//           <ul style="color: #333; line-height: 1.6; padding-left: 20px;">
//             <li>Secure first-mover access to high-potential pharma ventures.</li>
//             <li>Network with Nigerian pharmaceutical CEOs and development finance leaders.</li>
//             <li>Gain exclusive insights into regulatory and market trends shaping the sector.</li>
//           </ul>
//           <p style="color: #333; line-height: 1.6;">
//             <strong>Program Timing:</strong> 10:00 AM – 1:00 PM WAT. A detailed agenda and venue will be shared in a follow-up email.
//           </p>
//           <p style="color: #333; line-height: 1.6;">
//             We look forward to your participation.
//           </p>
//         </div>

//         <!-- Footer -->
//         <div style="padding: 20px; text-align: center; color: #666; font-size: 14px;">
//           <p>Best regards,<br>The 2025 Pharma Growth and Investment Summit Team</p>
//           <p>Contact us at: <a href="mailto:info@pharmasummit2025.com" style="color: #013983;">info@pharmasummit2025.com</a></p>
//         </div>
//       </div>
//     `,
//   }),

//   rejectionAttendee: (name) => ({
//     subject: "Application Status – 2025 Nigeria Pharmaceutical Growth Summit",
//     text: `Dear ${name},\n\nThank you for your interest in the 2025 Nigeria Pharmaceutical Industry Growth and Investment Summit.\n\nWe regret to inform you that due to the high volume of applications all available seats have been exhausted, we are unable to approve your request at this time.\n\nWe appreciate your interest and hope to engage with you in future opportunities.\n\nBest regards,\nThe 2025 Pharma Growth and Investment Summit Team`,
//     html: `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
//         <!-- Header -->
//         <div style="background-color: #013983; padding: 20px; text-align: center; color: white;">
//           <h1 style="margin: 0; font-size: 24px;">2025 Nigeria Pharmaceutical Industry Growth and Investment Summit</h1>
//         </div>

//         <!-- Body -->
//         <div style="padding: 20px; background-color: white; border: 1px solid #e0e0e0;">
//           <h2 style="color: #013983; font-size: 20px;">Dear ${name},</h2>
//           <p style="color: #333; line-height: 1.6;">
//             Thank you for your interest in the 2025 Nigeria Pharmaceutical Industry Growth and Investment Summit.
//           </p>
//           <p style="color: #333; line-height: 1.6;">
//             We regret to inform you that due to the high volume of applications and all available seats being exhausted, we are unable to approve your request at this time.
//           </p>
//           <p style="color: #333; line-height: 1.6;">
//             We appreciate your interest and hope to engage with you in future opportunities.
//           </p>
//         </div>

//         <!-- Footer -->
//         <div style="padding: 20px; text-align: center; color: #666; font-size: 14px;">
//           <p>Best regards,<br>The 2025 Pharma Growth and Investment Summit Team</p>
//           <p>Contact us at: <a href="mailto:info@pharmasummit2025.com" style="color: #013983;">info@pharmasummit2025.com</a></p>
//         </div>
//       </div>
//     `,
//   }),

//   rejectionInvestor: (name) => ({
//     subject: "Application Update – 2025 Nigeria Pharmaceutical Growth Summit",
//     text: `Dear ${name},\n\nThank you for applying to participate in the 2025 Nigeria Pharmaceutical Industry Growth and Investment Summit.\n\nWe regret to inform you that due to the high volume of applications all available seats have been exhausted, we are unable to approve your request at this time.\n\nWe appreciate your interest and hope to engage with you in future opportunities.\n\nBest regards,\nThe 2025 Pharma Growth and Investment Summit Team`,
//     html: `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
//         <!-- Header -->
//         <div style="background-color: #013983; padding: 20px; text-align: center; color: white;">
//           <h1 style="margin: 0; font-size: 24px;">2025 Nigeria Pharmaceutical Industry Growth and Investment Summit</h1>
//         </div>

//         <!-- Body -->
//         <div style="padding: 20px; background-color: white; border: 1px solid #e0e0e0;">
//           <h2 style="color: #013983; font-size: 20px;">Dear ${name},</h2>
//           <p style="color: #333; line-height: 1.6;">
//             Thank you for applying to participate in the 2025 Nigeria Pharmaceutical Industry Growth and Investment Summit.
//           </p>
//           <p style="color: #333; line-height: 1.6;">
//             We regret to inform you that due to the high volume of applications and all available seats being exhausted, we are unable to approve your request at this time.
//           </p>
//           <p style="color: #333; line-height: 1.6;">
//             We appreciate your interest and hope to engage with you in future opportunities.
//           </p>
//         </div>

//         <!-- Footer -->
//         <div style="padding: 20px; text-align: center; color: #666; font-size: 14px;">
//           <p>Best regards,<br>The 2025 Pharma Growth and Investment Summit Team</p>
//           <p>Contact us at: <a href="mailto:info@pharmasummit2025.com" style="color: #013983;">info@pharmasummit2025.com</a></p>
//         </div>
//       </div>
//     `,
//   }),
// };

// // Registration endpoint
// app.post("/api/register", async (req, res) => {
//   try {
//     const newRegistration = new Registration(req.body);
//     const savedRegistration = await newRegistration.save();
//     res.status(201).json(savedRegistration);
//   } catch (error) {
//     console.error("Registration error:", error);
//     res.status(400).json({ error: "Registration failed" });
//   }
// });

// // Get all applications
// app.get("/api/applications", async (req, res) => {
//   try {
//     const applications = await Registration.find();
//     res.json(applications);
//   } catch (error) {
//     console.error("Fetch applications error:", error);
//     res.status(500).json({ error: "Failed to fetch applications" });
//   }
// });

// // Update application status
// app.put("/api/applications/:id/status", async (req, res) => {
//   try {
//     const updatedApp = await Registration.findByIdAndUpdate(
//       req.params.id,
//       { status: req.body.status },
//       { new: true }
//     );

//     if (!updatedApp) {
//       return res.status(404).json({ error: "Application not found" });
//     }

//     // Determine the user's full name
//     const fullName = `${updatedApp.firstName} ${updatedApp.surname}`;

//     // Determine if the user is an Investor or Attendee based on their category
//     const isInvestor = [
//       "Development Finance Institution",
//       "Private Equity",
//       "Venture Capital",
//       "Banks",
//     ].includes(updatedApp.category);

//     // Determine the email template based on status and category
//     let emailTemplate;
//     if (req.body.status === "APPROVED") {
//       emailTemplate = isInvestor
//         ? emailTemplates.approvalInvestor(fullName)
//         : emailTemplates.approvalAttendee(fullName);
//     } else if (req.body.status === "REJECTED") {
//       emailTemplate = isInvestor
//         ? emailTemplates.rejectionInvestor(fullName)
//         : emailTemplates.rejectionAttendee(fullName);
//     } else {
//       return res.status(400).json({ error: "Invalid status" });
//     }

//     // Send email
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: updatedApp.email,
//       subject: emailTemplate.subject,
//       text: emailTemplate.text,
//       html: emailTemplate.html, // Include the HTML version
//     };

//     await transporter.sendMail(mailOptions);
//     res.json(updatedApp);
//   } catch (error) {
//     console.error("Status update error:", error);
//     res.status(400).json({ error: "Status update failed" });
//   }
// });

// // Global error handler
// app.use((err, req, res, next) => {
//   console.error("Unhandled error:", err);
//   res.status(500).json({ error: "Internal server error" });
// });

// // Export the app for Vercel
// module.export = app;

const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connect");
const Registration = require("./models/Registeration");
const nodemailer = require("nodemailer");
require("dotenv/config");

const app = express();

app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

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

// Email templates with HTML
const emailTemplates = {
  approvalAttendee: (name) => ({
    subject: "Confirmation of Invitation – 2025 Nigeria Pharmaceutical Industry Growth and Investment Summit",
    text: `Dear ${name},\n\nOn behalf of the 2025 Pharma Growth and Investment Summit Team, we are pleased to confirm your exclusive invitation to the inaugural Nigeria Pharmaceutical Industry Growth and Investment Summit on May 22, 2025.\n\nAs a CEO of an organization within Nigeria’s pharmaceutical or healthcare value chain, your participation will be instrumental in shaping the future of Africa’s largest pharma market. This closed-door summit offers unparalleled opportunities to:\n- Engage directly with industry pioneers and government stakeholders.\n- Connect with strategic investors to explore new capital opportunities.\n- Access first-mover insights into investment and regulatory trends.\n- Collaborate on innovative strategies to drive growth across the sector.\n\nProgram Timing: 10:00 AM – 1:00 PM WAT. A detailed agenda and venue will be shared in a follow-up email.\n\nWe look forward to your participation.\n\nBest regards,\nThe 2025 Pharma Growth and Investment Summit Team`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <!-- Header -->
        <div style="background-color: #013983; padding: 20px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 24px;">2025 Nigeria Pharmaceutical Industry Growth and Investment Summit</h1>
        </div>

        <!-- Body -->
        <div style="padding: 20px; background-color: white; border: 1px solid #e0e0e0;">
          <h2 style="color: #013983; font-size: 20px;">Dear ${name},</h2>
          <p style="color: #333; line-height: 1.6;">
            On behalf of the 2025 Pharma Growth and Investment Summit Team, we are pleased to confirm your exclusive invitation to the inaugural Nigeria Pharmaceutical Industry Growth and Investment Summit on <strong>May 22, 2025</strong>.
          </p>
          <p style="color: #333; line-height: 1.6;">
            As a CEO of an organization within Nigeria’s pharmaceutical or healthcare value chain, your participation will be instrumental in shaping the future of Africa’s largest pharma market. This closed-door summit offers unparalleled opportunities to:
          </p>
          <ul style="color: #333; line-height: 1.6; padding-left: 20px;">
            <li>Engage directly with industry pioneers and government stakeholders.</li>
            <li>Connect with strategic investors to explore new capital opportunities.</li>
            <li>Access first-mover insights into investment and regulatory trends.</li>
            <li>Collaborate on innovative strategies to drive growth across the sector.</li>
          </ul>
          <p style="color: #333; line-height: 1.6;">
            <strong>Program Timing:</strong> 10:00 AM – 1:00 PM WAT. A detailed agenda and venue will be shared in a follow-up email.
          </p>
          <p style="color: #333; line-height: 1.6;">
            We look forward to your participation.
          </p>
        </div>

        <!-- Footer -->
        <div style="padding: 20px; text-align: center; color: #666; font-size: 14px;">
          <p>Best regards,<br>The 2025 Pharma Growth and Investment Summit Team</p>
          <p>Contact us at: <a href="mailto:info@pharmasummit2025.com" style="color: #013983;">info@pharmasummit2025.com</a></p>
        </div>
      </div>
    `,
  }),

  approvalInvestor: (name) => ({
    subject: "Investor Invitation Confirmed – 2025 Nigeria Pharmaceutical Growth Summit",
    text: `Dear ${name},\n\nThe 2025 Pharma Growth and Investment Summit Team is delighted to confirm your acceptance as a high-profile investor at the Nigeria Pharmaceutical Industry Growth and Investment Summit on May 22, 2025.\n\nYour role as a strategic capital partner positions you at the forefront of Africa’s most promising healthcare market. This summit will enable you to:\n- Secure first-mover access to high-potential pharma ventures.\n- Network with Nigerian pharmaceutical CEOs and development finance leaders.\n- Gain exclusive insights into regulatory and market trends shaping the sector.\n\nProgram Timing: 10:00 AM – 1:00 PM WAT. A detailed agenda and venue will be shared in a follow-up email.\n\nWe look forward to your participation.\n\nBest regards,\nThe 2025 Pharma Growth and Investment Summit Team`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <!-- Header -->
        <div style="background-color: #013983; padding: 20px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 24px;">2025 Nigeria Pharmaceutical Industry Growth and Investment Summit</h1>
        </div>

        <!-- Body -->
        <div style="padding: 20px; background-color: white; border: 1px solid #e0e0e0;">
          <h2 style="color: #013983; font-size: 20px;">Dear ${name},</h2>
          <p style="color: #333; line-height: 1.6;">
            The 2025 Pharma Growth and Investment Summit Team is delighted to confirm your acceptance as a high-profile investor at the Nigeria Pharmaceutical Industry Growth and Investment Summit on <strong>May 22, 2025</strong>.
          </p>
          <p style="color: #333; line-height: 1.6;">
            Your role as a strategic capital partner positions you at the forefront of Africa’s most promising healthcare market. This summit will enable you to:
          </p>
          <ul style="color: #333; line-height: 1.6; padding-left: 20px;">
            <li>Secure first-mover access to high-potential pharma ventures.</li>
            <li>Network with Nigerian pharmaceutical CEOs and development finance leaders.</li>
            <li>Gain exclusive insights into regulatory and market trends shaping the sector.</li>
          </ul>
          <p style="color: #333; line-height: 1.6;">
            <strong>Program Timing:</strong> 10:00 AM – 1:00 PM WAT. A detailed agenda and venue will be shared in a follow-up email.
          </p>
          <p style="color: #333; line-height: 1.6;">
            We look forward to your participation.
          </p>
        </div>

        <!-- Footer -->
        <div style="padding: 20px; text-align: center; color: #666; font-size: 14px;">
          <p>Best regards,<br>The 2025 Pharma Growth and Investment Summit Team</p>
          <p>Contact us at: <a href="mailto:info@pharmasummit2025.com" style="color: #013983;">info@pharmasummit2025.com</a></p>
        </div>
      </div>
    `,
  }),

  rejectionAttendee: (name) => ({
    subject: "Application Status – 2025 Nigeria Pharmaceutical Growth Summit",
    text: `Dear ${name},\n\nThank you for your interest in the 2025 Nigeria Pharmaceutical Industry Growth and Investment Summit.\n\nWe regret to inform you that due to the high volume of applications all available seats have been exhausted, we are unable to approve your request at this time.\n\nWe appreciate your interest and hope to engage with you in future opportunities.\n\nBest regards,\nThe 2025 Pharma Growth and Investment Summit Team`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <!-- Header -->
        <div style="background-color: #013983; padding: 20px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 24px;">2025 Nigeria Pharmaceutical Industry Growth and Investment Summit</h1>
        </div>

        <!-- Body -->
        <div style="padding: 20px; background-color: white; border: 1px solid #e0e0e0;">
          <h2 style="color: #013983; font-size: 20px;">Dear ${name},</h2>
          <p style="color: #333; line-height: 1.6;">
            Thank you for your interest in the 2025 Nigeria Pharmaceutical Industry Growth and Investment Summit.
          </p>
          <p style="color: #333; line-height: 1.6;">
            We regret to inform you that due to the high volume of applications and all available seats being exhausted, we are unable to approve your request at this time.
          </p>
          <p style="color: #333; line-height: 1.6;">
            We appreciate your interest and hope to engage with you in future opportunities.
          </p>
        </div>

        <!-- Footer -->
        <div style="padding: 20px; text-align: center; color: #666; font-size: 14px;">
          <p>Best regards,<br>The 2025 Pharma Growth and Investment Summit Team</p>
          <p>Contact us at: <a href="mailto:info@pharmasummit2025.com" style="color: #013983;">info@pharmasummit2025.com</a></p>
        </div>
      </div>
    `,
  }),

  rejectionInvestor: (name) => ({
    subject: "Application Update – 2025 Nigeria Pharmaceutical Growth Summit",
    text: `Dear ${name},\n\nThank you for applying to participate in the 2025 Nigeria Pharmaceutical Industry Growth and Investment Summit.\n\nWe regret to inform you that due to the high volume of applications all available seats have been exhausted, we are unable to approve your request at this time.\n\nWe appreciate your interest and hope to engage with you in future opportunities.\n\nBest regards,\nThe 2025 Pharma Growth and Investment Summit Team`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <!-- Header -->
        <div style="background-color: #013983; padding: 20px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 24px;">2025 Nigeria Pharmaceutical Industry Growth and Investment Summit</h1>
        </div>

        <!-- Body -->
        <div style="padding: 20px; background-color: white; border: 1px solid #e0e0e0;">
          <h2 style="color: #013983; font-size: 20px;">Dear ${name},</h2>
          <p style="color: #333; line-height: 1.6;">
            Thank you for applying to participate in the 2025 Nigeria Pharmaceutical Industry Growth and Investment Summit.
          </p>
          <p style="color: #333; line-height: 1.6;">
            We regret to inform you that due to the high volume of applications and all available seats being exhausted, we are unable to approve your request at this time.
          </p>
          <p style="color: #333; line-height: 1.6;">
            We appreciate your interest and hope to engage with you in future opportunities.
          </p>
        </div>

        <!-- Footer -->
        <div style="padding: 20px; text-align: center; color: #666; font-size: 14px;">
          <p>Best regards,<br>The 2025 Pharma Growth and Investment Summit Team</p>
          <p>Contact us at: <a href="mailto:info@pharmasummit2025.com" style="color: #013983;">info@pharmasummit2025.com</a></p>
        </div>
      </div>
    `,
  }),
};

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

    // Determine the user's full name
    const fullName = `${updatedApp.firstName} ${updatedApp.surname}`;

    // Determine if the user is an Investor or Attendee based on their category
    const isInvestor = [
      "Development Finance Institution",
      "Private Equity",
      "Venture Capital",
      "Banks",
    ].includes(updatedApp.category);

    // Determine the email template based on status and category
    let emailTemplate;
    if (req.body.status === "APPROVED") {
      emailTemplate = isInvestor
        ? emailTemplates.approvalInvestor(fullName)
        : emailTemplates.approvalAttendee(fullName);
    } else if (req.body.status === "REJECTED") {
      emailTemplate = isInvestor
        ? emailTemplates.rejectionInvestor(fullName)
        : emailTemplates.rejectionAttendee(fullName);
    } else {
      return res.status(400).json({ error: "Invalid status" });
    }

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: updatedApp.email,
      subject: emailTemplate.subject,
      text: emailTemplate.text,
      html: emailTemplate.html, // Include the HTML version
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