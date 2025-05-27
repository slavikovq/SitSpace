const mongoose = require('mongoose');

const classSchema = mongoose.Schema({
    author_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    class_name: { type: String, required: true},
    class_id: { type: Number, required: true},
    total_seats: { type: Number, required: true},
    layout: { type: [[Number]], required: true}
})

module.exports = mongoose.model("Class", classSchema);