const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  message: String,
  status: {
    type: String,
    default: "Open"
  }
});

module.exports = mongoose.model("Complaint", complaintSchema);
