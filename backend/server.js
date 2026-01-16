const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User");
const Donation = require("./models/Donation");
const Event = require("./models/Event");

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
//CREATE EVENT
// CREATE EVENT (NGO)
app.post("/events/create", async (req, res) => {
  try {
    const { ngoId, title, description, date, location } = req.body;

    if (!ngoId || !title || !date || !location || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const event = new Event({
      ngoId,
      title,
      description,
      date,
      location,
      registeredUsers: []
    });

    await event.save();

    res.json({ message: "Event created successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL EVENTS (Donor & Volunteer)
app.get("/events", async (req, res) => {
  try {
    const events = await Event.find().populate("ngoId", "name");
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get("/events/ngo/:ngoId", async (req, res) => {
  try {
    const events = await Event.find({ ngoId: req.params.ngoId });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// REGISTER FOR EVENT (Donor / Volunteer)
app.post("/events/register/:eventId", async (req, res) => {
  try {
    const { userId, role } = req.body;

    const event = await Event.findById(req.params.eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.status !== "Upcoming") {
      return res.json({ message: "Event is not active" });
    }

    const alreadyRegistered = event.registeredUsers.some(
       u => u.userId === userId && u.role === role
    );

    if (alreadyRegistered) {
      return res.json({ message: "Already registered" });
    }

    event.registeredUsers.push({ userId, role });
    await event.save();

    res.json({ message: "Registered successfully" });

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
// NGO: SEE ALL DONATIONS REQUESTED BY NGO
app.get("/ngo/donations/:ngoId", async (req, res) => {
  try {
    const donations = await Donation.find({
      ngoId: req.params.ngoId
    });

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
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
app.put("/events/update/:eventId", async (req, res) => {
  try {
    const { title, description, date, location } = req.body;

    await Event.findByIdAndUpdate(req.params.eventId, {
      title,
      description,
      date,
      location
    });

    res.json({ message: "Event updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.put("/events/update/:eventId", async (req, res) => {
  try {
    const { title, description, date, location } = req.body;

    await Event.findByIdAndUpdate(req.params.eventId, {
      title,
      description,
      date,
      location
    });

    res.json({ message: "Event updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
