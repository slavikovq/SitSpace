const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
    author_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    group_name: { type: String, required: true},
    group_id: { type: Number, required: true},
    students: [
        {
            student_id: { type: Number, required: true},
            student_name: { type: String, required: true}
        }
    ]
})

module.exports = mongoose.model("Group", groupSchema);