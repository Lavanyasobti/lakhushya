const mongoose = require("mongoose");

const ngoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  organizationName: String,
  registrationNumber: String,
  address: String,
  verifiedByAdmin: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("NGO", ngoSchema);
