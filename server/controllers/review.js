const Review = require("../models/review");

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();

    if (!reviews) return res.status(404).json({ message: "Reviews not found" });

    res.status(200).send({
      message: "Reviews found",
      payload: reviews,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) return res.status(404).json({ message: "Review not found" });

    res.status(200).send({
      message: "Review found",
      payload: review,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserReview = async (req, res) => {
  try {
    const userId = req.user.userId;
    const review = await Review.findOne({ author_id: userId });

    if (!review) return res.status(404).json({ message: "Review not found" });

    res.status(200).send({
      message: "Review found",
      payload: review,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createReview = async (req, res) => {
  try {
    const data = new Review({
      author_id: req.body.author_id,
      rating: req.body.rating,
      text: req.body.text,
    });
    const result = await data.save();

    if (result) {
      return res.status(201).send({
        message: "Review created",
        payload: result,
      });
    }

    res.status(400).send({
      message: "Wrong input!",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const data = {
      rating: req.body.rating,
      text: req.body.text,
    };
    const result = await Review.findByIdAndUpdate(req.params.id, data);

    if (result) {
      return res.status(200).send({
        message: "Review updated",
        payload: result,
      });
    }

    res.status(400).send({
      message: "Wrong input!",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const result = await Review.findByIdAndDelete(req.params.id);

    if (result) {
      return res.status(200).send({
        message: "Review deleted",
        payload: result,
      });
    }

    res.status(400).send({
      message: "Wrong input!",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
