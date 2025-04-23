// Add this at the top
const Activity = require('../models/activityModel');

exports.createBatchActivities = async (req, res) => {
  try {
    // Add validation
    if (!req.body.activities || !Array.isArray(req.body.activities)) {
      return res.status(400).json({
        success: false,
        error: "Invalid request format: 'activities' array required"
      });
    }

    const activities = req.body.activities.map(activity => ({
      type: activity.type,
      productId: activity.productId || null,
      score: activity.score,
      userId: req.body.userId,
      email: req.body.email,
      createdAt: new Date(activity.timestamp || Date.now())
    }));

    // Insert into database
    await Activity.insertMany(activities);
    
    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Batch activity error:', error);
    res.status(400).json({ 
      success: false, 
      error: error.message 
    });
  }
};