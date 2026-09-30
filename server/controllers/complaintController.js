const Complaint = require("../models/Complaint");

const createComplaint = async (req, res) => {
  try {
    const { title, category, description, priority } = req.body;

    if (!title || !category || !description) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const complaint = await Complaint.create({
      title,
      category,
      description,
      priority: priority || "Medium",
      user: req.user.id,
    });

    res.status(201).json({
      message: "Complaint submitted successfully",
      complaint,
    });
  } catch (error) {
    console.error("Create complaint error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      complaints,
    });
  } catch (error) {
    console.error("Get complaints error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    res.status(200).json({
      complaint,
    });
  } catch (error) {
    console.error("Get complaint error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      complaints,
    });
  } catch (error) {
    console.error("Get all complaints error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const updateComplaint = async (req, res) => {
  try {
    const { status, remarks } = req.body;

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    complaint.status = status || complaint.status;
    complaint.remarks = remarks ?? complaint.remarks;

    await complaint.save();

    res.status(200).json({
      message: "Complaint updated successfully",
      complaint,
    });
  } catch (error) {
    console.error("Update complaint error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  createComplaint,
  getMyComplaints,
  getComplaintById,
  getAllComplaints,
  updateComplaint,
};