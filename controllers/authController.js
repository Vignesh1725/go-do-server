const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const alreadyPresent = await User.findOne({ email });
        if (alreadyPresent) {
            return res.status(400).json({ error: "User is already registered" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword })
        res.status(201).json({
            message: "Registration successful",
            user: { id: user._id, name: user.name, email: user.email },
        });
    } catch (err) {
        console.error("Register Error:", err);
        res.status(400).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials " });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.json({ token, user: { email: user.email, name: user.name } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};