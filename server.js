require('dotenv/config');
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const connectDB = require('./db/connect');
const Registration = require('./models/Registeration');

// Constants
const MAIL_SERVICE_URL = 'https://mail.pbr.com.ng/send';
const MAIL_FROM_EMAIL = process.env.MAIL_FROM_EMAIL || 'adeoye.sobande@pbrinsight.com';
const MAIL_FROM_NAME = process.env.MAIL_FROM_NAME || 'Kareem';
const INVESTOR_CATEGORIES = [
  'Development Finance Institution',
  'Private Equity',
  'Venture Capital',
  'Banks'
];

// Initialize Express app
const app = express();

// Middleware
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json());

// Connect to MongoDB
connectDB().catch((error) => {
  console.error('Failed to start server due to MongoDB connection error:', error);
  process.exit(1);
});

// Email Service
class EmailService {
  static async sendEmail(to, subject, html) {
    try {
      const payload = {
        to,
        fromEmail: MAIL_FROM_EMAIL,
        name: MAIL_FROM_NAME,
        subject,
        body: html,
        isHtml: true // Add this flag to indicate HTML content
      };

      const response = await axios.post(MAIL_SERVICE_URL, payload, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000,
      });

      return response.data;
    } catch (error) {
      console.error('Email sending failed:', {
        message: error.message,
        response: error.response ? {
          status: error.response.status,
          data: error.response.data,
        } : null,
      });
      throw new Error('Failed to send email');
    }
  }
}

// Email Templates
class EmailTemplates {
  static baseTemplate(title, name, content) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: #013983; padding: 20px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 24px;">${title}</h1>
        </div>
        <div style="padding: 20px; background-color: white; border: 1px solid #e0e0e0;">
          <h2 style="color: #013983; font-size: 20px;">Dear ${name},</h2>
          ${content}
        </div>
        <div style="padding: 20px; text-align: center; color: #666; font-size: 14px;">
          <p>Best regards,<br>The 2025 Pharma Growth and Investment Summit Team</p>
          <p>Contact us at: <a href="mailto:info@pharmasummit2025.com" style="color: #013983;">info@pharmasummit2025.com</a></p>
        </div>
      </div>
    `;
  }

  static approvalAttendee(name) {
    const content = `
      <p style="color: #333; line-height: 1.6;">
        On behalf of the 2025 Pharma Growth and Investment Summit Team, we are pleased to confirm your exclusive invitation to the inaugural Nigeria Pharmaceutical Industry Growth and Investment Summit on <strong>May 22, 2025</strong>.
      </p>
      <p style="color: #333; line-height: 1.6;">
        As a CEO of an organization within Nigeria's pharmaceutical or healthcare value chain, your participation will be instrumental in shaping the future of Africa's largest pharma market. This closed-door summit offers unparalleled opportunities to:
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
    `;

    return {
      subject: 'Confirmation of Invitation – 2025 Nigeria Pharmaceutical Industry Growth and Investment Summit',
      html: this.baseTemplate('2025 Nigeria Pharmaceutical Industry Growth and Investment Summit', name, content),
    };
  }

  static approvalInvestor(name) {
    const content = `
      <p style="color: #333; line-height: 1.6;">
        The 2025 Pharma Growth and Investment Summit Team is delighted to confirm your acceptance as a high-profile investor at the Nigeria Pharmaceutical Industry Growth and Investment Summit on <strong>May 22, 2025</strong>.
      </p>
      <p style="color: #333; line-height: 1.6;">
        Your role as a strategic capital partner positions you at the forefront of Africa's most promising healthcare market. This summit will enable you to:
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
    `;

    return {
      subject: 'Investor Invitation Confirmed – 2025 Nigeria Pharmaceutical Growth Summit',
      html: this.baseTemplate('2025 Nigeria Pharmaceutical Industry Growth and Investment Summit', name, content),
    };
  }

  static rejectionAttendee(name) {
    const content = `
      <p style="color: #333; line-height: 1.6;">
        Thank you for your interest in the 2025 Nigeria Pharmaceutical Industry Growth and Investment Summit.
      </p>
      <p style="color: #333; line-height: 1.6;">
        We regret to inform you that due to the high volume of applications and all available seats being exhausted, we are unable to approve your request at this time.
      </p>
      <p style="color: #333; line-height: 1.6;">
        We appreciate your interest and hope to engage with you in future opportunities.
      </p>
    `;

    return {
      subject: 'Application Status – 2025 Nigeria Pharmaceutical Growth Summit',
      html: this.baseTemplate('2025 Nigeria Pharmaceutical Industry Growth and Investment Summit', name, content),
    };
  }

  static rejectionInvestor(name) {
    const content = `
      <p style="color: #333; line-height: 1.6;">
        Thank you for applying to participate in the 2025 Nigeria Pharmaceutical Industry Growth and Investment Summit.
      </p>
      <p style="color: #333; line-height: 1.6;">
        We regret to inform you that due to the high volume of applications and all available seats being exhausted, we are unable to approve your request at this time.
      </p>
      <p style="color: #333; line-height: 1.6;">
        We appreciate your interest and hope to engage with you in future opportunities.
      </p>
    `;

    return {
      subject: 'Application Update – 2025 Nigeria Pharmaceutical Growth Summit',
      html: this.baseTemplate('2025 Nigeria Pharmaceutical Industry Growth and Investment Summit', name, content),
    };
  }
}

// Helper Functions
const getFullName = (registration) => {
  const fullName = `${registration.firstName || ''} ${registration.surname || ''}`.trim();
  if (!fullName) {
    throw new Error('Application missing required name fields');
  }
  return fullName;
};

const isInvestor = (category) => {
  return INVESTOR_CATEGORIES.includes(category);
};

const getEmailTemplate = (status, isInvestor, name) => {
  if (status === 'APPROVED') {
    return isInvestor 
      ? EmailTemplates.approvalInvestor(name) 
      : EmailTemplates.approvalAttendee(name);
  }
  return isInvestor 
    ? EmailTemplates.rejectionInvestor(name) 
    : EmailTemplates.rejectionAttendee(name);
};

// Routes
app.post('/api/register', async (req, res) => {
  try {
    const newRegistration = new Registration(req.body);
    const savedRegistration = await newRegistration.save();
    res.status(201).json(savedRegistration);
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({ error: 'Registration failed', details: error.message });
  }
});

app.get('/api/applications', async (req, res) => {
  try {
    const applications = await Registration.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    console.error('Fetch applications error:', error);
    res.status(500).json({ error: 'Failed to fetch applications', details: error.message });
  }
});

app.put('/api/applications/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!id || !status) {
      return res.status(400).json({ error: 'ID and status are required' });
    }

    if (!['APPROVED', 'REJECTED'].includes(status)) {
      return res.status(400).json({ error: 'Status must be APPROVED or REJECTED' });
    }

    // Get current application state before update
    const currentApp = await Registration.findById(id);
    if (!currentApp) {
      return res.status(404).json({ error: 'Application not found' });
    }

    // Update application status
    const updatedApp = await Registration.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    try {
      const fullName = getFullName(updatedApp);
      const investor = isInvestor(updatedApp.category);
      const template = getEmailTemplate(status, investor, fullName);

      await EmailService.sendEmail(
        updatedApp.email,
        template.subject,
        template.html
      );

      res.json(updatedApp);
    } catch (emailError) {
      // Revert status if email fails
      await Registration.findByIdAndUpdate(id, { status: currentApp.status });
      throw emailError;
    }
  } catch (error) {
    console.error('Status update error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
});

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date() });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Export the app
module.exports = app;