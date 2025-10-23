const Job = require("../models/Job");
const User = require("../models/User");

exports.getJobs = async (req, res) => {
    const jobs = await Job.find().populate("postedBy", "name email");
    res.json(jobs);
};

exports.postJob = async (req, res) => {
    const job = await Job.create({ ...req.body, postedBy: req.userId });
    res.status(201).json(job);
};

exports.applyJob = async (req, res) => {
    const job = await Job.findById(req.params.id);
    if (!job) {
        return res.status(404).json({ error: "Job not found" });
    }
    if (job.applicants.includes(req.userId)) {
        return res.status(400).json({ error: "Already applied" });
    }
    job.applicants.push(req.userId);
    await job.save();
    await User.findByIdAndUpdate(req.userId, { $push: { appliedJobs: job._id } });
    res.json({ message: "Applied successfully" });
};

exports.updateJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ error: "Job not found" });
        if (job.postedBy.toString() !== req.userId) return res.status(403).json({ error: "Not authorized" });
        Object.assign(job, req.body);
        await job.save();
        res.json(job);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ error: "Job not found" });
        if (job.postedBy.toString() !== req.userId) return res.status(403).json({ error: "Not authorized" });
        await job.remove();
        res.json({ message: "Job deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
