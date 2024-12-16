const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../utilis/emailservice");
const JWT_SECRET = process.env.JWT_SECRET;

// register 
const registerUser = async (req, res) => {
  const { FirstName, LastName, email, phoneNumber, password, confirmpassword } =
    req.body;

  if (password !== confirmpassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const newUser = new User({
      FirstName,
      LastName,
      email,
      phoneNumber,
      password: hashedPassword,
      confirmpassword: hashedPassword,
      otp,
    });

    await newUser.save();
    console.log(newUser);

    const emailContent = `Hi ${FirstName} ${LastName},\n\nThank you for registering on our platform! Please use the following OTP to verify your email:\n\n${otp}\n\nBest regards,\nYour Team`;

    await sendEmail(email, "Verify Your Email", emailContent);

    res.status(201).json({
      message:
        "User registered successfully. Please verify the OTP sent to your email.",
    });
  } catch (error) {
    console.error("Error during registration:", error.message);
    res
      .status(500)
      .json({ message: "User registration failed", error: error.message });
  }
};

// verify otp
const verifyOtp = async (req, res) => {
  const { otp } = req.body;

  try {
    const user = await User.findOne({ otp });

    if (!user || user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP!" });
    }

    user.isVerified = true;
    user.otp = null;
    await user.save();

    res.status(200).json({ message: "Account verified successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// login
loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found with email:", email);
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Invalid credentials for email:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a token
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1d",
    });
    console.log("Generating JWT for user:", user.email, token);
    res.status(200).json({
      token,
      user: {
        id: user._id,
        FirstName: user.FirstName,
        LastName: user.LastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Failed to login", error });
  }
};

// get single user
getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to get User", error });
  }
};
// get all users only admin
getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "failed to get all users", error });
  }
};

// update user
updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Failed to Update User", error });
  }
};

// delete user
deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete the user", error });
  }
};

// logout
const Userlogout = (req, res) => {
  res
    .status(200)
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
    .json({
      success: true,
      message: "Logged out successfully",
    });
};

module.exports = {
  registerUser,
  loginUser,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers,
  Userlogout,
  verifyOtp,
};
