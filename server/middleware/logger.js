const ActivityLog = require('../models/ActivityLog');

const logActivity = async (adminId, action, entity, details, entityId) => {
  try {
    await ActivityLog.create({ adminId, action, entity, details, entityId });
  } catch (error) {
    console.error('Error logging activity:', error);
  }
};

module.exports = logActivity;
