const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../model/userModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

// Register User Function
const registerUser = asyncHandler(async (req, res) => {
    const { email, firstname, lastname, age, bloodgroup, gender, phoneNumber, password } = req.body;

    if (!firstname || !lastname || !age || !bloodgroup || !gender || !email || !password || !phoneNumber) {
        res.status(400);
        throw new Error("Please provide all fields");
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        email,
        firstname,
        lastname,
        age,
        bloodgroup,
        gender,
        phoneNumber,
        password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully", user });
});

// Login User Function
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ email });

    if (foundUser && (await bcrypt.compare(password, foundUser.password))) {
        const token = jwt.sign({ id: foundUser.id }, 'yourSecretKey', { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: "Invalid email or password" });
    }
});
module.exports = { registerUser, loginUser};
