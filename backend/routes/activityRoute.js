const router = require('express').Router();
const activityCtrl = require('../controllers/activityCtrl');

// Make sure this route matches your frontend request
router.post('/activities/batch', activityCtrl.createBatchActivities);

module.exports = router;