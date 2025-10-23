const express = require("express");
const router = express.Router();
const { getJobs, postJob, applyJob, updateJob, deleteJob } = require("../controllers/jobController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", getJobs);
router.post("/", protect, postJob);
router.post("/:id/apply", protect, applyJob);
router.put("/:id", protect, updateJob);
router.delete("/:id", protect, deleteJob);

module.exports = router;