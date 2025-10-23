const User = require("../models/User");
const Job = require("../models/Job");

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password").populate("appliedJobs");
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const updates = req.body;
        const user = await User.findByIdAndUpdate(req.userId, updates, { new: true }).select("-password");
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAppliedJobs = async (req, res) => {
    try {
        const user = await User.findById(req.userId).populate("appliedJobs");
        res.json(user.appliedJobs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
