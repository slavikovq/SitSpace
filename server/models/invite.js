const mongoose = require('mongoose');

const inviteSchema = mongoose.Schema({
    author_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    author_email: { type: String, required: true},
    author_f_name: { type: String, required: true},
    author_l_name: { type: String, required: true},

    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    user_email: { type: String, required: true},
    user_f_name: { type: String, required: true},
    user_l_name: { type: String, required: true},
})

module.exports = mongoose.model("Invite", inviteSchema);