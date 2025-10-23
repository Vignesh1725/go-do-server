const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    applicants: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createdAr: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Job", jobSchema);