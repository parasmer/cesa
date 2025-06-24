const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();
const { db } = require("./firebaseAdmin");

const app = express();
const PORT = 5050;

//  Middleware
app.use(express.json()); // Parse JSON
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Optional logging for debugging
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

app.post("/send-confirmation", async (req, res) => {
  const { to, name, phone, college, scholarNo, event, eventId, eventDate } = req.body;

  try {
    // Store in Firestore
    await db.collection("registrations").add({
      name,
      email: to,
      phone,
      college,
      scholarNo,
      eventId,
      event,
      eventDate,
      timestamp: new Date(),
    });

    // Send confirmation email
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"CESA MANIT" <${process.env.MAIL_USER}>`,
      to,
      subject: `Confirmation for ${event}`,
      html: `<h3>Hello ${name},</h3><p>You're successfully registered for <b>${event}</b> on ${eventDate}.</p><p>Thanks,<br/>CESA MANIT</p>`,
    });

    console.log(" Email sent:", info.messageId);
    res.status(200).json({ success: true, message: "Registered and email sent" });
  } catch (err) {
    console.error("❌ Error during registration:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});



// Registration and login logic

app.post("/register", async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  // Basic validation
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  // Optional: Check for existing user
  const existing = users.find((u) => u.email === email);
  if (existing) {
    return res.status(409).json({ message: "User already exists." });
  }
  try{
    const hashedPassword = await bcrypt.hash(password, 10);
      await db.collection("users").add({ 
        firstName, 
        lastName,
        email, 
        password:hashedPassword,
      }); 
 return res.status(201).json({ 
  success:true,
  message: "User registered successfully." });

  }
  catch(error){
    console.error("❌ Error:", error);
    return res.status(500).json({ message: "Registration failed." });
  }
});
  // Add to in-memory storage (or save to Firestore)
 

app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
