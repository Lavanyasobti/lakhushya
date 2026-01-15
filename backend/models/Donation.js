const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({

  // WHO CREATED REQUEST
  donorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },

  ngoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },

  // DONATION DETAILS
  itemName: String,
  category: String,
  quantity: String,
  pickupDate: String,
  pickupTime: String,
  address: String,

  // WHO SENT REQUEST (donor / ngo)
  requestedBy: {
    type: String,
    enum: ["donor", "ngo"],
    required: true
  },

  // PICKUP STATUS
  status: {
    type: String,
    enum: ["pending", "accepted", "declined", "picked", "completed"],
    default: "pending"
  },

  // VOLUNTEER WHO ACCEPTED
  volunteerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  }

});

module.exports = mongoose.model("Donation", donationSchema);
