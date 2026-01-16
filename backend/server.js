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
  if (role === "Admin") {
  return res.status(403).send("Admin registration not allowed");
  }

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
      role,
      itemName,
      category,
      quantity,
      pickupDate,
      pickupTime,
      address
    } = req.body;

    const donation = new Donation({
      donorId: role === "donor" ? userId : null,
      ngoId: null,                     // IMPORTANT
      itemName,
      category,
      quantity,
      pickupDate,
      pickupTime,
      address,
      requestedBy: role,
      status: "pending_ngo"            // MUST match enum
    });

    await donation.save();

    res.status(201).json({
      message: "Pickup request created successfully"
    });

  } catch (err) {
    console.error("DONATION CREATE ERROR:", err); // ⭐ ADD THIS
    res.status(500).json({ error: err.message });
  }
});



app.get("/donation/:donorId", async (req, res) => {
  const donations = await Donation.find({
    donorId: req.params.donorId
  });

  res.json(donations);
});
// NGO: SEE ALL DONATIONS REQUESTED BY NGO
app.get("/ngo/donations/:ngoId", async (req, res) => {
  try {
    const donations = await Donation.find({
      status: {
        $in: ["pending_ngo", "ngo_approved", "ngo_declined"]
      }
    }).populate("donorId", "name");

    res.json(donations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// NGO ACCEPT DONATION
app.post("/ngo/accept/:id", async (req, res) => {
  const donation = await Donation.findByIdAndUpdate(
    req.params.id,
    {
      status: "ngo_approved"
    },
    { new: true }
  );

  res.json(donation);
});

app.post("/ngo/decline/:id", async (req, res) => {
  const donation = await Donation.findByIdAndUpdate(
    req.params.id,
    { status: "declined" },
    { new: true }
  );

  res.json(donation);
});



// NGO: SEE ALL DONATIONS WAITING FOR NGO APPROVAL
app.get("/ngo/pending-donations", async (req, res) => {
  try {
    const donations = await Donation.find({
      status: "pending",
      requestedBy: "donor",
      ngoId: null
    }).populate("donorId", "name");

    res.json(donations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// ADMIN: GET ALL USERS
app.get("/admin/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// ADMIN: GET ALL DONATIONS
app.get("/admin/donations", async (req, res) => {
  const donations = await Donation.find()
    .populate("donorId", "name")
    .populate("ngoId", "name")
    .populate("volunteerId", "name");

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
        { status: "ngo_approved" }, // 👈 NGO approved, waiting for volunteer
        { volunteerId: volunteerId } // 👈 already accepted by this volunteer
      ]
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

    res.json(donation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// VOLUNTEER DECLINE PICKUP
app.post("/volunteer/decline/:donationId", async (req, res) => {
  await Donation.findByIdAndUpdate(
    req.params.donationId,
    { status: "declined_by_volunteer" }
  );

  res.json({ message: "Pickup declined" });
});

