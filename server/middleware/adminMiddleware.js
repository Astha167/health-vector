const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'Access denied: Admin only' });
};

const orgAdminOrAdmin = (req, res, next) => {
  if (req.user && (req.user.role === 'org_admin' || req.user.role === 'admin')) {
    return next();
  }
  return res.status(403).json({ message: 'Access denied: Organization admin only' });
};

module.exports = { adminOnly, orgAdminOrAdmin };
