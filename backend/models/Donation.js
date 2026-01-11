const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  donorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  itemName: String,
  category: String,
  quantity: Number,

  pickupDate: String,
  pickupTime: String,
  address: String,

  urgent: Boolean,

  status: {
    type: String,
    default: "Pending"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Donation", donationSchema);
