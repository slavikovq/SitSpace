const Invite = require("../models/invite");
const Share = require("../models/share");

exports.getAllAuthorInvites = async (req, res) => {
  try {
    const userId = req.user.userId;
    const invites = await Invite.find({ author_id: userId });

    if (!invites) return res.status(404).json({ message: "Invites not found! " });

    res.status(200).send({
      message: "Invites found!",
      payload: invites,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllUserInvites = async (req, res) => {
  try {
    const userId = req.user.userId;
    const invites = await Invite.find({ user_id: userId });

    if (!invites) return res.status(404).json({ message: "Invites not found! " });

    res.status(200).send({
      message: "Invites found!",
      payload: invites,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createInvite = async (req, res) => {
  try {
    const existingInvite = await Invite.findOne({
      author_id: req.body.author_id,
      user_id: req.body.user_id,
    });

    const existingShare = await Share.findOne({
      author_id: req.body.author_id,
      user_id: req.body.user_id,
    });

    if (existingInvite) {
      return res.status(409).json({ message: "You have already sent an invite to this user!" });
    }
    
    if (existingShare) {
      return res.status(409).json({ message: "You have already shared your seating plans with this user!" });
    }

    const data = new Invite({
      author_id: req.body.author_id,
      author_email: req.body.author_email,
      author_f_name: req.body.author_f_name,
      author_l_name: req.body.author_l_name,
      user_id: req.body.user_id,
      user_email: req.body.user_email,
      user_f_name: req.body.user_f_name,
      user_l_name: req.body.user_l_name
    });

    const result = await data.save();

    if (result) {
      return res.status(201).send({
        message: "Invite send!",
        payload: result,
      });
    }

    res.status(400).json({ message: "Wrong input!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteInvite = async (req, res) => {
  try {
    const invite = await Invite.findById(req.params.id);

    if (invite.author_id.toString() !== req.user.userId && invite.user_id.toString() !== req.user.userId)
      return res.status(404).json({ message: "Invite not found!" });

    const result = await Invite.findByIdAndDelete(req.params.id);
    if (result) {
      return res.status(200).send({
        message: "Invite deleted!",
        payload: result,
      });
    }
    res.status(400).json({ message: "Wrong input!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
