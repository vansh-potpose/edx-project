const Review = require('../models/review');
const Book = require('../models/book');

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ book: req.params.bookId }).populate('user', 'username');
    res.json(reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.addReview = async (req, res) => {
  try {
    const { review, rating } = req.body;
    const newReview = new Review({
      user: req.user.id,
      book: req.params.bookId,
      review,
      rating,
    });
    const savedReview = await newReview.save();

    const book = await Book.findById(req.params.bookId);
    book.reviews.push(savedReview.id);
    await book.save();

    res.json(savedReview);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateReview = async (req, res) => {
  try {
    const { review, rating } = req.body;
    let reviewToUpdate = await Review.findById(req.params.reviewId);

    if (!reviewToUpdate) {
      return res.status(404).json({ msg: 'Review not found' });
    }

    if (reviewToUpdate.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    reviewToUpdate = await Review.findByIdAndUpdate(
      req.params.reviewId,
      { review, rating },
      { new: true }
    );

    res.json(reviewToUpdate);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);

    if (!review) {
      return res.status(404).json({ msg: 'Review not found' });
    }

    if (review.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await review.remove();

    res.json({ msg: 'Review removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
