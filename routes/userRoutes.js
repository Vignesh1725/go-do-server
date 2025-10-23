const express = require("express");
const router = express.Router();
const { getProfile, updateProfile, getAppliedJobs } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.get("/me", protect, getProfile);
router.put("/me", protect, updateProfile);
router.get("/me/applied-jobs", protect, getAppliedJobs);

module.exports = router;
