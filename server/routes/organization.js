const express = require('express');
const router = express.Router();
const { registerOrg, getOrgDashboard, inviteMembers } = require('../controllers/orgController');
const { protect } = require('../middleware/authMiddleware');
const { orgAdminOrAdmin } = require('../middleware/adminMiddleware');

router.post('/register', protect, registerOrg);
router.get('/dashboard', protect, orgAdminOrAdmin, getOrgDashboard);
router.post('/invite', protect, orgAdminOrAdmin, inviteMembers);

module.exports = router;
