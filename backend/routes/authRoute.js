const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  getUserByEmail,
  checkEmail,
} = require("../controllers/authController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();


// router.get("/", (req, res) => {
//   res.json({ message: "Auth route working!" });
// });
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", verifyToken, getUserProfile);
router.post("/check-email", checkEmail);
router.post("/reset-password", getUserByEmail);

module.exports = router;
