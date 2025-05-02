const mongoose = require('mongoose');

// creates schema
const bookingSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  vehicleNumber: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
