const User = require('../models/User');
const Assessment = require('../models/Assessment');
const Appointment = require('../models/Appointment');
const Organization = require('../models/Organization');
const { sendEmail } = require('../utils/emailSender');

// @route GET /api/admin/stats
const getStats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [totalUsers, assessmentsToday, totalAssessments, totalAppointments, totalOrgs] = await Promise.all([
      User.countDocuments(),
      Assessment.countDocuments({ completedAt: { $gte: today } }),
      Assessment.countDocuments(),
      Appointment.countDocuments(),
      Organization.countDocuments(),
    ]);

    res.json({ totalUsers, assessmentsToday, totalAssessments, totalAppointments, totalOrgs });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats' });
  }
};

// @route GET /api/admin/users
const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 20, role, search } = req.query;
    const filter = {};
    if (role) filter.role = role;
    if (search) filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];

    const total = await User.countDocuments(filter);
    const users = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip((page - 1) * parseInt(limit))
      .limit(parseInt(limit));

    res.json({ users, total, pages: Math.ceil(total / parseInt(limit)) });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

// @route PUT /api/admin/users/:id/role
const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating role' });
  }
};

// @route GET /api/admin/appointments
const getAppointments = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = status ? { status } : {};
    const total = await Appointment.countDocuments(filter);
    const appointments = await Appointment.find(filter)
      .populate('userId', 'name email')
      .sort({ date: -1 })
      .skip((page - 1) * parseInt(limit))
      .limit(parseInt(limit));
    res.json({ appointments, total, pages: Math.ceil(total / parseInt(limit)) });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments' });
  }
};

// @route PUT /api/admin/appointments/:id/status
const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Error updating appointment' });
  }
};

// @route POST /api/admin/contact (contact form handler)
const handleContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    await sendEmail({
      to: process.env.ADMIN_EMAIL || 'admin@vitametrics.com',
      subject: `VitaMetrics Contact: ${subject}`,
      html: `<p><strong>From:</strong> ${name} (${email})</p><p><strong>Subject:</strong> ${subject}</p><p>${message}</p>`,
    });
    res.json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending message' });
  }
};

module.exports = { getStats, getUsers, updateUserRole, getAppointments, updateAppointmentStatus, handleContact };
