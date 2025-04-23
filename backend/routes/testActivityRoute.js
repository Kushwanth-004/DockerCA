const router = require('express').Router();

router.post('/test-activities', (req, res) => {
  console.log('Received test activities:', req.body);
  res.json({ received: true });
});

module.exports = router;