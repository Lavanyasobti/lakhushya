const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User");
const Donation = require("./models/Donation");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/lakhushya_db")
  .then(() => console.log("Database Connected"))
  .catch(err => console.log(err));

app.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  // check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).send("User already exists");
  }

  // create new user
  const newUser = new User({
    name,
    email,
    password,
    role
  });

  await newUser.save();
  res.send("User registered successfully");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (!user) {
    return res.status(401).send("Invalid email or password");
  }

  res.json({
    message: "Login successful",
    role: user.role,
    userId: user._id
  });
});

app.post("/donation/create", async (req, res) => {
  const {
    donorId,
    itemName,
    category,
    quantity,
    pickupDate,
    pickupTime,
    address
  } = req.body;

  const donation = new Donation({
  donorId,
  itemName,
  category,
  quantity,
  pickupDate,
  pickupTime,
  address,
  urgent: false
});


  await donation.save();
  res.send("Donation created successfully");
});

app.get("/donation/:donorId", async (req, res) => {
  const donations = await Donation.find({
    donorId: req.params.donorId
  });

  res.json(donations);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
