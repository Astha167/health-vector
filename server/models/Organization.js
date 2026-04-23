const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sector: {
      type: String,
      enum: ['IT', 'Manufacturing', 'Education', 'Healthcare', 'Other'],
      required: true,
    },
    size: {
      type: String,
      enum: ['<50', '50-200', '200-500', '500+'],
    },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    departments: [{ type: String }],
    invitedEmails: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Organization', organizationSchema);
