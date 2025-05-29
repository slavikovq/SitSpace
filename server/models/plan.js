const mongoose = require('mongoose');

const planSchema = mongoose.Schema({
    author_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    user_collaboration_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    class_id: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
    group_id: { type: mongoose.Schema.Types.ObjectId, ref: "Group", required: true },
    classroom_name: { type: String, required: true },
    group_name: { type: String, required: true },
    customGroup_id: { type: Number, required: true },
    seats_count: { type: Number, required: true },
    students_count: { type: Number, required: true },
    plan: { type: [[[mongoose.Schema.Types.Mixed]]], required: true}
})

module.exports = mongoose.model("Plan", planSchema);