const Share = require("../models/share");

exports.getAllAuthorShares = async (req, res) => {
  try {
    const userId = req.user.userId;
    const shares = await Share.find({ author_id: userId });

    if (!shares) return res.status(404).json({ message: "Shares not found! " });

    res.status(200).send({
      message: "Shares found!",
      payload: shares,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllUserShares = async (req, res) => {
  try {
    const userId = req.user.userId;
    const shares = await Share.find({ user_id: userId });

    if (!shares) return res.status(404).json({ message: "Shares not found! " });

    res.status(200).send({
      message: "Shares found!",
      payload: shares,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createShare = async (req, res) => {
  try {
    const existingShare = await Share.findOne({
      author_id: req.body.author_id,
      user_id: req.body.user_id,
    });

    if (existingShare) {
      return res.status(409).json({ message: "You have already shared your seating plans with this user!" });
    }

    const data = new Share({
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
        message: "Share send!",
        payload: result,
      });
    }

    res.status(400).json({ message: "Wrong input!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteShare = async (req, res) => {
  try {
    const share = await Share.findById(req.params.id);

    if (share.author_id.toString() !== req.user.userId && share.user_id.toString() !== req.user.userId)
      return res.status(404).json({ message: "Share not found!" });

    const result = await Share.findByIdAndDelete(req.params.id);
    if (result) {
      return res.status(200).send({
        message: "Share deleted!",
        payload: result,
      });
    }
    res.status(400).json({ message: "Wrong input!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
