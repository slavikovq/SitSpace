const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const auth = require("../middlewares/auth");
const upload = require("../middlewares/upload");

router.get("/", auth, userController.getUser)
router.get("/:id", userController.getUserById);
router.post("/login", userController.login);
router.post("/register", userController.register);
router.post("/verifyPassword", auth, userController.verifyPassword)
router.put("/update", auth, upload.single("profilePicture"), userController.updateUser);

module.exports = router;