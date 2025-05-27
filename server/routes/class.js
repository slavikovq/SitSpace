const express = require("express");
const router = express.Router();
const classController = require("../controllers/class");
const auth = require("../middlewares/auth");

router.get("/", auth, classController.getAllUserClasses);
router.get("/:id", auth, classController.getUserClassById);
router.post("/", auth, classController.createClass);
router.put("/:id", auth, classController.updateClass);
router.delete("/:id", auth, classController.deleteClass);

module.exports = router;