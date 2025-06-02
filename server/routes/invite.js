const express = require("express");
const router = express.Router();
const inviteController = require("../controllers/invite");
const auth = require("../middlewares/auth");

router.get("/author", auth, inviteController.getAllAuthorInvites);
router.get("/user", auth, inviteController.getAllUserInvites);
router.post("/", auth, inviteController.createInvite);
router.delete("/:id", auth, inviteController.deleteInvite);

module.exports = router;