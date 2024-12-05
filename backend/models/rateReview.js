const mongoose = require('mongoose');

const rateReviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5 
  },
  reviewText: {
    type: String,
    required: false,
    maxlength: 500 
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const RateReview = mongoose.model('RateReview', rateReviewSchema);

module.exports = RateReview;
