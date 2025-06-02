const Class = require("../models/class");

exports.getAllUserClasses = async (req, res) => {
  try {
    const userId = req.user.userId;
    const classroom = await Class.find({ author_id: userId });

    if (!classroom) return res.status(404).json({ message: "Classs not found! " });

    res.status(200).send({
      message: "Classes found!",
      payload: classroom,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserClassById = async (req, res) => {
  try {
    const classroom = await Class.findById(req.params.id);

    if (!classroom) return res.status(404).json({ message: "Class not found! " });

    res.status(200).send({
      message: "Class found!",
      payload: classroom,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createClass = async (req, res) => {
  try {
    const lastClass = await Class.find({ author_id: req.user.userId })
      .sort({ class_id: -1 })
      .limit(1);
    const nextClassId = lastClass.length ? lastClass[0].class_id + 1 : 1;

    const data = new Class({
      author_id: req.user.userId,
      class_name: req.body.class_name,
      class_id: nextClassId,
      total_seats: req.body.total_seats,
      layout: req.body.layout
    });

    const result = await data.save();

    if (result) {
      return res.status(201).send({
        message: "Class created!",
        payload: result,
      });
    }

    res.status(400).json({ message: "Wrong input!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateClass = async (req, res) => {
  try {
    const classroom = await Class.findById(req.params.id);

    if (classroom.author_id.toString() !== req.user.userId)
      return res.status(404).json({ message: "Class not found! " });

    const data = {
      class_name: req.body.class_name,
      total_seats: req.body.total_seats,
      layout: req.body.layout
    };

    const result = await Class.findByIdAndUpdate(req.params.id, data);
    if (result) {
      return res.status(200).send({
        message: "Class updated!",
        payload: result,
      });
    }
    res.status(400).json({ message: "Wrong input!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteClass = async (req, res) => {
  try {
    const classroom = await Class.findById(req.params.id);

    if (classroom.author_id.toString() !== req.user.userId)
      return res.status(404).json({ message: "Class not found! " });

    const result = await Class.findByIdAndDelete(req.params.id);
    if (result) {
      return res.status(200).send({
        message: "Class deleted!",
        payload: result,
      });
    }
    res.status(400).json({ message: "Wrong input!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
