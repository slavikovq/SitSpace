const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    author_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    rating: { type: Number, enum: [1, 2, 3, 4, 5], required: true},
    text: { type: String, required: true},
    date_created: { type: Date, default: Date.now}
})

module.exports = mongoose.model("Review", reviewSchema);