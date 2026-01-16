const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  ngoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  title: String,
  description: String,
  date: String,
  location: String,

  status: {
    type: String,
    default: "Upcoming" // Upcoming | Cancelled | Completed
  },

  registeredUsers: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      role: String // Donor | Volunteer
    }
  ]
});

module.exports = mongoose.model("Event", eventSchema);
