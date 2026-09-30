const adminOnly = require("../middleware/adminMiddleware");
const express = require("express");

const {
  createComplaint,
  getMyComplaints,
  getComplaintById,
  getAllComplaints,
  updateComplaint,
} = require("../controllers/complaintController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createComplaint);

router.get("/my", protect, getMyComplaints);

router.get("/all", protect, adminOnly, getAllComplaints);

router.get("/:id", protect, getComplaintById);

router.put("/:id", protect, adminOnly, updateComplaint);

module.exports = router;