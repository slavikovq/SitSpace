const Plan = require("../models/plan");

exports.getAllUserPlans = async (req, res) => {
  try {
    const userId = req.user.userId;
    const plans = await Plan.find({ author_id: userId });

    if (!plans) return res.status(404).json({ message: "Plans not found! " });

    res.status(200).send({
      message: "Plans found!",
      payload: plans,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserPlanById = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);

    if (!plan) return res.status(404).json({ message: "Plan not found! " });
    if (plan.author_id.toString() !== req.user.userId)
      return res.status(404).json({ message: "Plan not found! " });

    res.status(200).send({
      message: "Plan found!",
      payload: plan,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createPlan = async (req, res) => {
  try {
    const data = new Plan({
      author_id: req.user.userId,
      userCanView_id: req.body.userCanView_id,
      class_id: req.body.class_id,
      group_id: req.body.group_id,
      plan: req.body.plan
    });

    const result = await data.save();

    if (result) {
      return res.status(201).send({
        message: "Plan created!",
        payload: result,
      });
    }

    res.status(400).json({ message: "Wrong input!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updatePlan = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);

    if (plan.author_id.toString() !== req.user.userId)
      return res.status(404).json({ message: "Plan not found! " });

    const data = {
      userCanView_id: req.body.userCanView_id,
      class_id: req.body.class_id,
      group_id: req.body.group_id,
      plan: req.body.plan
    };

    const result = await Plan.findByIdAndUpdate(req.params.id, data);
    if (result) {
      return res.status(200).send({
        message: "Plan updated!",
        payload: result,
      });
    }
    res.status(400).json({ message: "Wrong input!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deletePlan = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);

    if (plan.author_id.toString() !== req.user.userId)
      return res.status(404).json({ message: "Plan not found! " });

    const result = await Plan.findByIdAndDelete(req.params.id);
    if (result) {
      return res.status(200).send({
        message: "Plan deleted!",
        payload: result,
      });
    }
    res.status(400).json({ message: "Wrong input!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
