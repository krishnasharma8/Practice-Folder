// const express = require("express");
// const router = express.Router();
// const validateToken = require("../middleware/jwtMiddleware").validateToken;

// const { registerUser, loginUser , getUserProfile} = require("../controllers/userController");

// router.post("/register", registerUser);
// router.post("/login", loginUser);
// // Protect /profile route with validateToken middleware
// // router.post("/profile", validateToken);
// router.get("/profile", getUserProfile);

// module.exports = router;

const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/jwtMiddleware").validateToken;

const { registerUser, loginUser, getUserProfile, updateUserProfile } = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
// Protect /profile route with validateToken middleware
// router.post("/profile", validateToken);
router.post("/profile", getUserProfile); // Use POST for fetching the profile
router.get("/profile", validateToken, getUserProfile);//get request using token
// Route for updating the user's profile (Protected route)
router.put("/profile",validateToken,updateUserProfile);

module.exports = router;