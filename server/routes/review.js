const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/review");
const auth = require("../middlewares/auth");

router.get("/", reviewController.getAllReviews);
router.get("/user", auth, reviewController.getUserReview);
router.get("/:id", reviewController.getReviewById);
router.post("/", auth, reviewController.createReview);
router.put("/:id", auth, reviewController.updateReview);
router.delete("/:id", auth, reviewController.deleteReview);

module.exports = router;