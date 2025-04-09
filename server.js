const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connect");
const Registration = require("./models/Registeration");
const axios = require("axios"); // Add axios for HTTP requests
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

// Email templates with HTML
// const emailTemplates = {
//   approvalAttendee: (name) => ({
//     subject: "Confirmation of Invitation – 2025 Nigeria Pharmaceutical Industry Growth and Investment Summit",
//     body: `Dear ${name},\n\nOn behalf of the 2025 Pharma Growth and Investment Summit Team, we are pleased to confirm your exclusive invitation to the inaugural Nigeria Pharmaceutical Industry Growth and Investment Summit on May 22, 2025.\n\nAs a CEO of an organization within Nigeria’s pharmaceutical or healthcare value chain, your participation will be instrumental in shaping the future of Africa’s largest pharma market. This closed-door summit offers unparalleled opportunities to:\n- Engage directly with industry pioneers and government stakeholders.\n- Connect with strategic investors to explore new capital opportunities.\n- Access first-mover insights into investment and regulatory trends.\n- Collaborate on innovative strategies to drive growth across the sector.\n\nProgram Timing: 10:00 AM – 1:00 PM WAT. A detailed agenda and venue will be shared in a follow-up email.\n\nWe look forward to your participation.\n\nBest regards,\nThe 2025 Pharma Growth and Investment Summit Team`,
//     html: `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
//         <div style="background-color: #013983; padding: 20px; text-align: center; color: white;">
//           <h1 style="margin: 0; font-size: 24px;">2025 Nigeria Pharmaceutical Industry Growth and Investment Summit</h1>
//         </div>
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
//         <div style="padding: 20px; text-align: center; color: #666; font-size: 14px;">
//           <p>Best regards,<br>The 2025 Pharma Growth and Investment Summit Team</p>
//           <p>Contact us at: <a href="mailto:info@pharmasummit2025.com" style="color: #013983;">info@pharmasummit2025.com</a></p>
//         </div>
//       </div>
//     `,
//   }),

//   approvalInvestor: (name) => ({
//     subject: "Investor Invitation Confirmed – 2025 Nigeria Pharmaceutical Growth Summit",
//     body: `Dear ${name},\n\nThe 2025 Pharma Growth and Investment Summit Team is delighted to confirm your acceptance as a high-profile investor at the Nigeria Pharmaceutical Industry Growth and Investment Summit on May 22, 2025.\n\nYour role as a strategic capital partner positions you at the forefront of Africa’s most promising healthcare market. This summit will enable you to:\n- Secure first-mover access to high-potential pharma ventures.\n- Network with Nigerian pharmaceutical CEOs and development finance leaders.\n- Gain exclusive insights into regulatory and market trends shaping the sector.\n\nProgram Timing: 10:00 AM – 1:00 PM WAT. A detailed agenda and venue will be shared in a follow-up email.\n\nWe look forward to your participation.\n\nBest regards,\nThe 2025 Pharma Growth and Investment Summit Team`,
//     html: `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
//         <div style="background-color: #013983; padding: 20px; text-align: center; color: white;">
//           <h1 style="margin: 0; font-size: 24px;">2025 Nigeria Pharmaceutical Industry Growth and Investment Summit</h1>
//         </div>
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
//         <div style="padding: 20px; text-align: center; color: #666; font-size: 14px;">
//           <p>Best regards,<br>The 2025 Pharma Growth and Investment Summit Team</p>
//           <p>Contact us at: <a href="mailto:info@pharmasummit2025.com" style="color: #013983;">info@pharmasummit2025.com</a></p>
//         </div>
//       </div>
//     `,
//   }),

//   rejectionAttendee: (name) => ({
//     subject: "Application Status – 2025 Nigeria Pharmaceutical Growth Summit",
//     body: `Dear ${name},\n\nThank you for your interest in the 2025 Nigeria Pharmaceutical Industry Growth and Investment Summit.\n\nWe regret to inform you that due to the high volume of applications all available seats have been exhausted, we are unable to approve your request at this time.\n\nWe appreciate your interest and hope to engage with you in future opportunities.\n\nBest regards,\nThe 2025 Pharma Growth and Investment Summit Team`,
//     html: `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
//         <div style="background-color: #013983; padding: 20px; text-align: center; color: white;">
//           <h1 style="margin: 0; font-size: 24px;">2025 Nigeria Pharmaceutical Industry Growth and Investment Summit</h1>
//         </div>
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
//         <div style="padding: 20px; text-align: center; color: #666; font-size: 14px;">
//           <p>Best regards,<br>The 2025 Pharma Growth and Investment Summit Team</p>
//           <p>Contact us at: <a href="mailto:info@pharmasummit2025.com" style="color: #013983;">info@pharmasummit2025.com</a></p>
//         </div>
//       </div>
//     `,
//   }),

//   rejectionInvestor: (name) => ({
//     subject: "Application Update – 2025 Nigeria Pharmaceutical Growth Summit",
//     body: `Dear ${name},\n\nThank you for applying to participate in the 2025 Nigeria Pharmaceutical Industry Growth and Investment Summit.\n\nWe regret to inform you that due to the high volume of applications all available seats have been exhausted, we are unable to approve your request at this time.\n\nWe appreciate your interest and hope to engage with you in future opportunities.\n\nBest regards,\nThe 2025 Pharma Growth and Investment Summit Team`,
//     html: `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
//         <div style="background-color: #013983; padding: 20px; text-align: center; color: white;">
//           <h1 style="margin: 0; font-size: 24px;">2025 Nigeria Pharmaceutical Industry Growth and Investment Summit</h1>
//         </div>
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
//         <div style="padding: 20px; text-align: center; color: #666; font-size: 14px;">
//           <p>Best regards,<br>The 2025 Pharma Growth and Investment Summit Team</p>
//           <p>Contact us at: <a href="mailto:info@pharmasummit2025.com" style="color: #013983;">info@pharmasummit2025.com</a></p>
//         </div>
//       </div>
//     `,
//   }),
// };

const emailTemplates = {
  approvalAttendee: (name) => ({
    subject: "Confirmed: Pharma Summit Participation - May 22, 2025",
    body: `Dear ${name},\n\nYour invitation to the Nigeria Pharmaceutical Industry Growth Summit is confirmed.\n\nDate: May 22, 2025\nTime: 10:00 AM WAT\n\nAs an industry leader, you'll:\n- Network with peers and government officials\n- Explore investment opportunities\n- Discuss regulatory updates\n- Shape market strategies\n\nVenue details will follow next week. Please confirm attendance by replying.\n\nBest regards,\n2025 Pharma Summit Team\nLagos Convention Center\n123 Victoria Island\n+234 800 000 0000\n[Unsubscribe Link]`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <title>Pharma Summit Confirmation</title>
      </head>
      <body style="margin:0; padding:20px; font-family: Arial, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: auto; background: #f9f9f9;">
          <!-- Header -->
          <tr>
            <td style="background: #013983; padding: 25px; text-align: center;">
              <img src="[LOGO_URL]" alt="Pharma Summit 2025" style="max-width: 180px; height: auto; display: block; margin: 0 auto;">
              <h1 style="color: #fff; font-size: 22px; margin: 15px 0 0 0; line-height: 1.3;">Nigeria Pharmaceutical Growth Summit</h1>
              <p style="color: #d3e3ff; margin: 8px 0 0 0; font-size: 15px;">May 22, 2025 | Lagos Convention Center</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 30px 25px; background: #ffffff;">
              <p style="color: #333; margin: 0 0 18px 0; line-height: 1.5;">Dear ${name},</p>
              
              <p style="color: #444; margin: 0 0 18px 0; line-height: 1.5;">We confirm your participation in the 2025 Nigeria Pharmaceutical Industry Growth Summit.</p>

              <table cellpadding="0" cellspacing="0" style="margin: 25px 0; width: 100%;">
                <tr>
                  <td style="width: 30%; color: #013983; font-weight: bold;">Date:</td>
                  <td style="width: 70%; color: #444;">May 22, 2025</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #013983; font-weight: bold;">Time:</td>
                  <td style="padding: 8px 0; color: #444;">10:00 AM - 1:00 PM WAT</td>
                </tr>
              </table>

              <h2 style="color: #013983; font-size: 18px; margin: 25px 0 15px 0; border-bottom: 2px solid #f0f4fb; padding-bottom: 8px;">Key Discussion Areas</h2>
              <ul style="padding-left: 20px; margin: 0; color: #444;">
                <li style="margin-bottom: 12px; line-height: 1.5;">Industry growth strategies</li>
                <li style="margin-bottom: 12px; line-height: 1.5;">Regulatory framework updates</li>
                <li style="margin-bottom: 12px; line-height: 1.5;">Investment partnership opportunities</li>
                <li style="line-height: 1.5;">Market expansion initiatives</li>
              </ul>

              <div style="background: #f8fbff; padding: 20px; border-radius: 4px; margin: 30px 0; border: 1px solid #e3ecff;">
                <p style="margin: 0 0 12px 0; color: #444; font-weight: bold;">Next Steps:</p>
                <p style="margin: 0; color: #444;">1. Venue details will arrive by May 1, 2025<br>
                2. Reply to confirm attendance<br>
                3. Contact us for special requirements</p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 25px; text-align: center; background: #f5f7fa;">
              <p style="color: #666; font-size: 12px; line-height: 1.6; margin: 0;">
                Lagos Convention Center<br>
                123 Victoria Island, Lagos, Nigeria<br>
                <a href="tel:+2348000000000" style="color: #013983; text-decoration: none;">+234 800 000 0000</a> | 
                <a href="mailto:info@pharmasummit2025.com" style="color: #013983; text-decoration: none;">Email Us</a><br>
                <a href="[UNSUBSCRIBE_LINK]" style="color: #666; text-decoration: underline; font-size: 11px;">Unsubscribe</a> | 
                <a href="[VIEW_IN_BROWSER]" style="color: #666; text-decoration: underline; font-size: 11px;">View in Browser</a>
              </p>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  }),

  approvalInvestor: (name) => ({
    subject: "Investor Access Confirmed - Pharma Summit 2025",
    body: `Dear ${name},\n\nYour investor credentials for the 2025 Pharma Growth Summit are confirmed.\n\nDate: May 22, 2025\nTime: 10:00 AM WAT\n\nBenefits include:\n- Curated meetings with pharma executives\n- Market analysis reports\n- Regulatory briefing documents\n\nVenue details arrive May 1. Reply to confirm attendance.\n\nBest regards,\n2025 Pharma Summit Team\nLagos Convention Center\n123 Victoria Island\n+234 800 000 0000\n[Unsubscribe Link]`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
      </head>
      <body style="margin:0; padding:20px; font-family: Arial, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: auto; background: #f9f9f9;">
          <tr>
            <td style="background: #013983; padding: 25px; text-align: center;">
              <img src="[LOGO_URL]" alt="Investor Portal Access" style="max-width: 180px; height: auto;">
              <h1 style="color: #fff; font-size: 22px; margin: 15px 0 0 0;">Investor Access Confirmed</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px 25px; background: #ffffff;">
              <p style="color: #333; margin: 0 0 18px 0;">Dear ${name},</p>
              <p style="color: #444; margin: 0 0 25px 0;">We confirm your investor credentials for the 2025 Nigeria Pharmaceutical Growth Summit.</p>

              <div style="background: #f8fbff; padding: 20px; border-radius: 4px; margin: 25px 0;">
                <p style="color: #013983; font-weight: bold; margin: 0 0 15px 0;">Investor Benefits Include:</p>
                <ul style="padding-left: 20px; margin: 0; color: #444;">
                  <li style="margin-bottom: 12px;">Executive networking sessions</li>
                  <li style="margin-bottom: 12px;">Exclusive market reports</li>
                  <li style="margin-bottom: 12px;">Regulatory briefings</li>
                  <li>Deal flow opportunities</li>
                </ul>
              </div>

              <table cellpadding="0" cellspacing="0" style="width: 100%; margin: 25px 0;">
                <tr>
                  <td style="width: 40%; color: #013983; font-weight: bold;">Event Date:</td>
                  <td style="width: 60%; color: #444;">May 22, 2025</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #013983; font-weight: bold;">Confirmation Required:</td>
                  <td style="padding: 10px 0; color: #444;">Reply by April 30, 2025</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 25px; text-align: center; background: #f5f7fa;">
              <p style="color: #666; font-size: 12px; margin: 0;">
                Lagos Convention Center<br>
                123 Victoria Island, Lagos<br>
                <a href="[UNSUBSCRIBE_LINK]" style="color: #666; text-decoration: underline;">Unsubscribe</a>
              </p>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  }),

  rejectionAttendee: (name) => ({
    subject: "2025 Pharma Summit Application Update",
    body: `Dear ${name},\n\nThank you for your summit application. Due to overwhelming response, we're unable to offer participation at this time.\n\nWe'll keep your details for:\n- Future event invitations\n- Industry updates\n- Networking opportunities\n\nContact us at info@pharmasummit2025.com for queries.\n\nBest regards,\n2025 Pharma Summit Team\n[Unsubscribe Link]`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
      </head>
      <body style="margin:0; padding:20px; font-family: Arial, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: auto; background: #f9f9f9;">
          <tr>
            <td style="background: #013983; padding: 25px; text-align: center;">
              <h1 style="color: #fff; font-size: 22px; margin: 0;">2025 Pharma Summit Update</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px 25px; background: #ffffff;">
              <p style="color: #333; margin: 0 0 18px 0;">Dear ${name},</p>
              <p style="color: #444; margin: 0 0 20px 0;">Thank you for your application. Due to high demand, we're unable to confirm participation currently.</p>
              
              <div style="border-left: 4px solid #f0f4fb; padding-left: 20px; margin: 25px 0;">
                <p style="color: #013983; font-weight: bold; margin: 0 0 12px 0;">We'll retain your details for:</p>
                <ul style="padding-left: 20px; margin: 0; color: #444;">
                  <li style="margin-bottom: 10px;">Future event notifications</li>
                  <li style="margin-bottom: 10px;">Sector analysis reports</li>
                  <li>Collaboration opportunities</li>
                </ul>
              </div>

              <p style="color: #444; margin: 25px 0 0 0;">Contact our team for any questions:<br>
              <a href="mailto:info@pharmasummit2025.com" style="color: #013983; text-decoration: none;">info@pharmasummit2025.com</a></p>
            </td>
          </tr>
          <tr>
            <td style="padding: 25px; text-align: center; background: #f5f7fa;">
              <p style="color: #666; font-size: 12px; margin: 0;">
                © 2025 Pharma Summit<br>
                <a href="[UNSUBSCRIBE_LINK]" style="color: #666; text-decoration: underline;">Update Preferences</a>
              </p>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  }),

  rejectionInvestor: (name) => ({
    subject: "Pharma Summit 2025 Investor Program Update",
    body: `Dear ${name},\n\nThank you for your investor program application. All investor slots are currently allocated.\n\nWe'll retain your information for:\n- Future capital opportunities\n- Sector updates\n- Partnership initiatives\n\nContact our investment team at investments@pharmasummit2025.com.\n\nBest regards,\n2025 Pharma Summit Team\n[Unsubscribe Link]`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
      </head>
      <body style="margin:0; padding:20px; font-family: Arial, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: auto; background: #f9f9f9;">
          <tr>
            <td style="background: #013983; padding: 25px; text-align: center;">
              <h1 style="color: #fff; font-size: 22px; margin: 0;">Investor Program Update</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px 25px; background: #ffffff;">
              <p style="color: #333; margin: 0 0 18px 0;">Dear ${name},</p>
              <p style="color: #444; margin: 0 0 20px 0;">We appreciate your investor program application. All current opportunities have been allocated.</p>

              <div style="background: #f8fbff; padding: 20px; margin: 25px 0; border-radius: 4px;">
                <p style="color: #013983; font-weight: bold; margin: 0 0 15px 0;">Next Steps:</p>
                <ul style="padding-left: 20px; margin: 0; color: #444;">
                  <li style="margin-bottom: 12px;">Priority access to future rounds</li>
                  <li style="margin-bottom: 12px;">Quarterly investment briefings</li>
                  <li>Direct introductions to portfolio companies</li>
                </ul>
              </div>

              <p style="color: #444; margin: 25px 0 0 0;">Contact our investment team:<br>
              <a href="mailto:investments@pharmasummit2025.com" style="color: #013983; text-decoration: none;">investments@pharmasummit2025.com</a></p>
            </td>
          </tr>
          <tr>
            <td style="padding: 25px; text-align: center; background: #f5f7fa;">
              <p style="color: #666; font-size: 12px; margin: 0;">
                Investment Relations Team<br>
                <a href="[UNSUBSCRIBE_LINK]" style="color: #666; text-decoration: underline;">Manage Subscriptions</a>
              </p>
            </td>
          </tr>
        </table>
      </body>
      </html>
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

    // Prepare payload for the microservice
    const mailPayload = {
      to: updatedApp.email,
      subject: emailTemplate.subject,
      body: emailTemplate.html || emailTemplate.body, // Use HTML if available, fallback to text
      isHtml: !!emailTemplate.html // Boolean indicating if body is HTML
    };

    // Send email via microservice
    await axios.post("https://api.pbr.com.ng/mail/send", mailPayload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

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