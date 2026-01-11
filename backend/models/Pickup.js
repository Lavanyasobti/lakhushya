const mongoose = require("mongoose");

const pickupSchema = new mongoose.Schema({
  donationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Donation"
  },
  volunteerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Volunteer"
  },
  status: {
    type: String,
    default: "Assigned"
  }
});

module.exports = mongoose.model("Pickup", pickupSchema);
