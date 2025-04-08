import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  firstName: { type: String, required: true },
  surname: { type: String, required: true },
  organization: { type: String, required: true },
  jobDesignation: { type: String, required: true },
  headquarters: { type: String, required: true },
  category: { type: String, required: true },
  mode: { type: String, required: true },
  networking: { type: [String], required: true },
  email: { type: String, required: true },
  status: { type: String, default: 'PENDING' },
  createdAt: { type: Date, default: Date.now }
});

const Registration = mongoose.model('Registration', registrationSchema);

export default Registration;