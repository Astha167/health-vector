const Organization = require('../models/Organization');
const User = require('../models/User');
const Assessment = require('../models/Assessment');
const { sendOrgInviteEmail } = require('../utils/emailSender');

// @route POST /api/org/register
const registerOrg = async (req, res) => {
  try {
    const { name, sector, size, departments } = req.body;

    const org = await Organization.create({
      name,
      sector,
      size,
      adminId: req.user._id,
      departments: departments || [],
    });

    // Link admin user to org
    await User.findByIdAndUpdate(req.user._id, {
      organizationId: org._id,
      role: 'org_admin',
    });

    res.status(201).json(org);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering organization' });
  }
};

// @route GET /api/org/dashboard
const getOrgDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user.organizationId) {
      return res.status(404).json({ message: 'No organization found for this user' });
    }

    const org = await Organization.findById(user.organizationId);
    const members = await User.find({ organizationId: org._id }).select('name email department prakritiType');

    const memberIds = members.map((m) => m._id);

    // Get latest assessment for each member
    const assessments = await Assessment.aggregate([
      { $match: { userId: { $in: memberIds } } },
      { $sort: { completedAt: -1 } },
      { $group: { _id: '$userId', latestAssessment: { $first: '$$ROOT' } } },
    ]);

    const assessmentMap = {};
    assessments.forEach((a) => {
      assessmentMap[a._id.toString()] = a.latestAssessment;
    });

    const memberData = members.map((m) => {
      const assessment = assessmentMap[m._id.toString()];
      return {
        _id: m._id,
        name: m.name,
        email: m.email,
        department: m.department,
        prakritiType: m.prakritiType,
        scores: assessment?.scores || null,
        lastAssessment: assessment?.completedAt || null,
      };
    });

    const completedAssessments = memberData.filter((m) => m.scores);
    const totalMembers = members.length;
    const completedCount = completedAssessments.length;
    const responseRate = totalMembers > 0 ? Math.round((completedCount / totalMembers) * 100) : 0;

    const avgPhysical = completedCount > 0 ? Math.round(completedAssessments.reduce((s, m) => s + (m.scores.physical || 0), 0) / completedCount) : 0;
    const avgMental = completedCount > 0 ? Math.round(completedAssessments.reduce((s, m) => s + (m.scores.mental || 0), 0) / completedCount) : 0;
    const avgEmotional = completedCount > 0 ? Math.round(completedAssessments.reduce((s, m) => s + (m.scores.emotional || 0), 0) / completedCount) : 0;
    const avgOverall = completedCount > 0 ? Math.round(completedAssessments.reduce((s, m) => s + (m.scores.overall || 0), 0) / completedCount) : 0;

    const zoneDistribution = { critical: 0, moderate: 0, optimal: 0 };
    completedAssessments.forEach((m) => {
      const score = m.scores.overall;
      if (score <= 40) zoneDistribution.critical++;
      else if (score <= 70) zoneDistribution.moderate++;
      else zoneDistribution.optimal++;
    });

    res.json({
      organization: org,
      stats: { totalMembers, completedCount, responseRate, avgOverall, avgPhysical, avgMental, avgEmotional },
      zoneDistribution,
      members: memberData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching org dashboard' });
  }
};

// @route POST /api/org/invite
const inviteMembers = async (req, res) => {
  try {
    const { emails } = req.body;
    const user = await User.findById(req.user._id);
    const org = await Organization.findById(user.organizationId);

    if (!org) return res.status(404).json({ message: 'Organization not found' });

    const results = [];
    for (const email of emails) {
      try {
        await sendOrgInviteEmail(email, org.name, org._id);
        await Organization.findByIdAndUpdate(org._id, { $addToSet: { invitedEmails: email } });
        results.push({ email, success: true });
      } catch (err) {
        results.push({ email, success: false, error: err.message });
      }
    }

    res.json({ results });
  } catch (error) {
    res.status(500).json({ message: 'Error sending invites' });
  }
};

module.exports = { registerOrg, getOrgDashboard, inviteMembers };
