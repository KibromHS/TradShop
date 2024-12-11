const mongoose = require('mongoose');

const rateReviewSchema = new mongoose.Schema({
  username: {
    type: String,
  },    
  productId: {
    type: String
  },
  rating: {
    type: Number,
  },
  text: {
    type: String,
  }
});

const Review = mongoose.model('Review', rateReviewSchema);

module.exports = Review;
