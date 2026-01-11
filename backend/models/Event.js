const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  ngoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "NGO"
  },
  title: String,
  description: String,
  date: Date,
  location: String
});

module.exports = mongoose.model("Event", eventSchema);
