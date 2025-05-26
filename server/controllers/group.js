const Group = require("../models/group");

exports.getAllUserGroups = async (req, res) => {
  try {
    const userId = req.user.userId;
    const groups = await Group.find({ author_id: userId });

    if (!groups) return res.status(404).json({ message: "Groups not found! " });

    res.status(200).send({
      message: "Groups found!",
      payload: groups,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);

    if (!group) return res.status(404).json({ message: "Group not found! " });
    if (group.author_id.toString() !== req.user.userId)
      return res.status(404).json({ message: "Group not found! " });

    res.status(200).send({
      message: "Group found!",
      payload: group,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createGroup = async (req, res) => {
  try {
    const lastGroup = await Group.find({ author_id: req.user.userId })
      .sort({ group_id: -1 })
      .limit(1);
    const nextGroupId = lastGroup.length ? lastGroup[0].group_id + 1 : 1;

    const data = new Group({
      author_id: req.user.userId,
      group_name: req.body.group_name,
      group_id: nextGroupId,
      students: req.body.students,
    });

    const result = await data.save();

    if (result) {
      return res.status(201).send({
        message: "Group created!",
        payload: result,
      });
    }

    res.status(400).json({ message: "Wrong input!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);

    if (group.author_id.toString() !== req.user.userId)
      return res.status(404).json({ message: "Group not found! " });

    const data = {
      group_name: req.body.group_name,
      students: req.body.students,
    };

    const result = await Group.findByIdAndUpdate(req.params.id, data);
    if (result) {
      return res.status(200).send({
        message: "Group updated!",
        payload: result,
      });
    }
    res.status(400).json({ message: "Wrong input!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);

    if (group.author_id.toString() !== req.user.userId)
      return res.status(404).json({ message: "Group not found! " });

    const result = await Group.findByIdAndDelete(req.params.id);
    if (result) {
      return res.status(200).send({
        message: "Group deleted!",
        payload: result,
      });
    }
    res.status(400).json({ message: "Wrong input!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
