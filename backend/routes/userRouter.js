const express = require("express");
const { registerUser, loginUser, getTestUsers } = require("../controllers/userController");

const router = express.Router();

// Test route to show all users
router.get("/test", getTestUsers);

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

module.exports = router;
// 🦖