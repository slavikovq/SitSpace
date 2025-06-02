const express = require("express");
const router = express.Router();
const shareController = require("../controllers/share");
const auth = require("../middlewares/auth");

router.get("/author", auth, shareController.getAllAuthorShares);
router.get("/user", auth, shareController.getAllUserShares);
router.post("/", auth, shareController.createShare);
router.delete("/:id", auth, shareController.deleteShare);

module.exports = router;