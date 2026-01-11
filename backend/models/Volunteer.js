const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  phone: String,
  availability: String
});

module.exports = mongoose.model("Volunteer", volunteerSchema);
