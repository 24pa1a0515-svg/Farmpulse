// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

// 🔧 Middleware
app.use(cors());
app.use(express.json());

// 🔐 Secret Key
const JWT_SECRET = "farmpulse_secret";

// 🌐 Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/farmpulse")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));

// ================= MODELS =================

// 👤 User Model
const User = mongoose.model("User", new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String // farmer or buyer
}));

// 🌾 Crop Model
const Crop = mongoose.model("Crop", new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
  village: String,
  contact: String,
  farmerId: mongoose.Schema.Types.ObjectId
}));

// ================= MIDDLEWARE =================

// 🔐 Auth Middleware
function auth(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).send("Access denied");

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch {
    res.status(400).send("Invalid token");
  }
}

// ================= AUTH ROUTES =================

// 📝 Register
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashed, role });
    await user.save();

    res.send("User Registered");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// 🔑 Login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("User not found");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).send("Invalid password");

    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET
    );

    res.json({ token, user });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// ================= CROP ROUTES =================

// ➕ Add Crop (Farmer only)
app.post("/api/crops", auth, async (req, res) => {
  try {
    const { name, price, quantity, village, contact } = req.body;

    const crop = new Crop({
      name,
      price,
      quantity,
      village,
      contact,
      farmerId: req.user.id
    });

    await crop.save();
    res.send("Crop Added");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// 📄 Get All Crops
app.get("/api/crops", async (req, res) => {
  const crops = await Crop.find();
  res.json(crops);
});

// ✏️ Update Crop
app.put("/api/crops/:id", auth, async (req, res) => {
  try {
    await Crop.findByIdAndUpdate(req.params.id, req.body);
    res.send("Crop Updated");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// ❌ Delete Crop
app.delete("/api/crops/:id", auth, async (req, res) => {
  try {
    await Crop.findByIdAndDelete(req.params.id);
    res.send("Crop Deleted");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// ================= START SERVER =================

app.get("/", (req, res) => {
  res.send("🌾 FarmPulse Backend Running");
});

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
