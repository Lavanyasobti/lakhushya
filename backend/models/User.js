const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["Donor", "NGO", "Volunteer", "Admin"]
  },
  verified: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("User", userSchema);
