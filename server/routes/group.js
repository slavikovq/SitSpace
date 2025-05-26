const express = require("express");
const router = express.Router();
const groupController = require("../controllers/group");
const auth = require("../middlewares/auth");

router.get("/", auth, groupController.getAllUserGroups);
router.get("/:id", auth, groupController.getUserGroupById);
router.post("/", auth, groupController.createGroup);
router.put("/:id", auth, groupController.updateGroup);
router.delete("/:id", auth, groupController.deleteGroup);

module.exports = router;