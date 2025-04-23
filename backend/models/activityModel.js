const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Users' 
  },
  email: String,
  type: {
    type: String,
    required: true,
    enum: ['page-view', 'product-view', 'cart', 'checkout', 'wishlist', 'login', 'register']
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  score: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Make sure this line exists and is correct
module.exports = mongoose.model('Activity', activitySchema);