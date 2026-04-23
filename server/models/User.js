const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    age: { type: Number },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    occupation: { type: String },
    department: { type: String },
    organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
    role: { type: String, enum: ['user', 'org_admin', 'admin'], default: 'user' },
    prakritiType: { type: String, enum: ['Vata', 'Pitta', 'Kapha', null], default: null },
    subscriptionPlan: { type: String, enum: ['free', 'pro', 'org'], default: 'free' },
    notificationPrefs: {
      email: { type: Boolean, default: true },
      monthlyReminder: { type: Boolean, default: true },
    },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    profilePicture: { type: String },
  },
  { timestamps: true }
);

// Hash password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
