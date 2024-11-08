const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/jwtMiddleware").validateToken;

const { registerUser, loginUser } = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
// Protect /profile route with validateToken middleware
// router.post("/profile", validateToken);
module.exports = router;

