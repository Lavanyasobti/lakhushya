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

// CREATE PICKUP REQUEST (DONOR or NGO)
app.post("/donation/create", async (req, res) => {
  try {
    const {
      userId,
      role,           // "donor" or "ngo"
      itemName,
      category,
      quantity,
      pickupDate,
      pickupTime,
      address
    } = req.body;

    const donationData = {
      itemName,
      category,
      quantity,
      pickupDate,
      pickupTime,
      address,
      requestedBy: role
    };

    if (role === "donor") {
      donationData.donorId = userId;
    }

    if (role === "ngo") {
      donationData.ngoId = userId;
    }

    const donation = new Donation(donationData);
    await donation.save();

    res.status(201).json({
      message:"Pickup request created successfully"
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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
// VOLUNTEER: SEE ALL PENDING PICKUPS
app.get("/volunteer/pickups/:volunteerId", async (req, res) => {
  try {
    const { volunteerId } = req.params;
    const pickups = await Donation.find({
      $or: [
  {status : "pending"},{volunteerId: volunteerId}]
   })
      .populate("donorId", "name")
      .populate("ngoId", "name");

    res.json(pickups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// VOLUNTEER ACCEPT PICKUP
app.post("/volunteer/accept/:donationId", async (req, res) => {
  try {
    const { volunteerId } = req.body;

    const donation = await Donation.findByIdAndUpdate(
      req.params.donationId,
      {
        status: "accepted",
        volunteerId
      },
      { new: true }
    );

    res.json({
      message: "Pickup accepted",
      donation
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// VOLUNTEER DECLINE PICKUP
app.post("/volunteer/decline/:donationId", async (req, res) => {
  try {
    await Donation.findByIdAndUpdate(req.params.donationId, {
      status: "declined"
    });

    res.json({ message: "Pickup declined" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
