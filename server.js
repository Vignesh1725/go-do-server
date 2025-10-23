const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/users", userRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => {
        console.log("Error: ", err);
    })

app.listen(PORT, process.env.SERVER, () => {
    console.log(`Server is running on port ${PORT}`);
});
