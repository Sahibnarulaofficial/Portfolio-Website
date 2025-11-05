import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import { Resend } from "resend";

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// ===== RESEND HTTP API SETUP =====
const resend = new Resend(process.env.RESEND_API_KEY);

// ===== Contact Form Handler =====
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "All fields required." });
  }

  // Optional: store locally (for local dev)
  const newEntry = { name, email, message, date: new Date().toISOString() };
  const filePath = path.join(__dirname, "messages.json");
  let messages = [];
  if (fs.existsSync(filePath)) {
    messages = JSON.parse(fs.readFileSync(filePath, "utf-8") || "[]");
  }
  messages.push(newEntry);
  fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));

  try {
    // ===== Send Email via Resend API =====
    const result = await resend.emails.send({
      from: "Sahib Narula <onboarding@resend.dev>",
      to: "sahibnarula106@gmail.com", // 🔹 your inbox
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    console.log("📨 Email sent successfully:", result);
    res.json({ success: true, message: "✅ Your message was sent successfully! I’ll get back to you soon." });
  } catch (error) {
    console.error("❌ Email error:", error);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
});

// Path to store subscriber list
const newsletterFile = path.join(__dirname, "newsletter.json");

// ===== Newsletter Subscription Route =====
app.post("/newsletter", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required." });
  }

  try {
    // Read existing list
    let subscribers = [];
    if (fs.existsSync(newsletterFile)) {
      const data = fs.readFileSync(newsletterFile, "utf8");
      subscribers = JSON.parse(data || "[]");
    }

    // Avoid duplicates
    if (subscribers.includes(email)) {
      return res.json({ success: true, message: "You're already subscribed!" });
    }

    // Save new email
    subscribers.push(email);
    fs.writeFileSync(newsletterFile, JSON.stringify(subscribers, null, 2));

    // Send you a notification email via Resend
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Sahib Narula <onboarding@resend.dev>",
      to: "sahibnarula106@gmail.com", // replace with your real inbox
      subject: "New Newsletter Subscriber",
      text: `New subscriber: ${email}`,
    });

    res.json({ success: true, message: "✅ Subscribed successfully!" });
  } catch (error) {
    console.error("Newsletter Error:", error);
    res.status(500).json({ success: false, message: "Something went wrong. Try again later." });
  }
});


// ===== Serve main page =====
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => console.log(`🚀 Silent Systems running on port ${PORT}`));
