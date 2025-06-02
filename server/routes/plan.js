const express = require("express");
const router = express.Router();
const planController = require("../controllers/plan");
const auth = require("../middlewares/auth");

router.get("/", auth, planController.getAllUserPlans);
router.get("/shared/:id", auth, planController.getAllSharedPlans);
router.get("/:id", auth, planController.getUserPlanById);
router.post("/", auth, planController.createPlan);
router.put("/:id", auth, planController.updatePlan);
router.delete("/:id", auth, planController.deletePlan);

module.exports = router;