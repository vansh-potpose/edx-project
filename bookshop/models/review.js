const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  review: { type: String, required: true },
  rating: { type: Number, required: true },
});

const Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;