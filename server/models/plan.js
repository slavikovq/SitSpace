const mongoose = require('mongoose');

const planSchema = mongoose.Schema({
    author_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    userCanView_id: { type: [mongoose.Schema.Types.ObjectId], ref: "User", default: null },
    class_id: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
    group_id: { type: mongoose.Schema.Types.ObjectId, ref: "Group", required: true },
    plan: { type: [[[mongoose.Schema.Types.Mixed]]], required: true}
})

module.exports = mongoose.model("Plan", planSchema);