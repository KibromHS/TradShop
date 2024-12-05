const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { userId, productId, rating, reviewText } = req.body;

        const newReview = new RateReview({
            userId,
            productId,
            rating,
            reviewText,
        });

        await newReview.save();
        res.status(201).json({ message: 'Review created successfully', review: newReview });
    } catch (err) {
        res.status(500).json({ message: 'Error creating review', error: err.message });
    }
});

router.get('/:productId', async (req, res) => {
    try {
      const { productId } = req.params;
  
      const reviews = await RateReview.find({ productId });
  
      if (!reviews) {
        return res.status(404).json({ message: 'No reviews found for this product' });
      }
  
      res.status(200).json(reviews);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching reviews', error: err.message });
    }
});
  

module.exports = router;