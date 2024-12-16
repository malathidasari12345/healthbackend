const Subscription = require("../models/subscribe");
const { sendEmail } = require("../utilis/emailservice");
require("dotenv").config();

const subscribeUser = async (req, res) => {
  try {
    const { email } = req.body;

    // Email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ error: "Please provide a valid email." });
    }

    // Save email to the database
    const subscription = new Subscription({ email });
    await subscription.save();

    // Prepare email content
    const subject = "Thank you for subscribing!";
    const text = `Hi there!\n\nThank you for subscribing to our newsletter. We'll keep you updated with the latest news.\n\nBest regards,\nTeam`;
    await sendEmail(email, subject, text);

    const adminEmail = process.env.EMAIL_USER;
    const adminName = adminEmail.split("@")[0].split(".")[0];
    const adminSubject = "New Subscription Notification";
    const adminText = `Hello ${adminName} ,\n\nA new user has subscribed to the newsletter.\n\nSubscriber Email: ${email}\n\nBest regards,\nSubscription System`;
    await sendEmail(adminEmail, adminSubject, adminText);

    res.status(200).json({ message: "Subscription successful!" });
  } catch (error) {
    console.error("Error in subscription:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred. Please try again later." });
  }
};

module.exports = { subscribeUser };
