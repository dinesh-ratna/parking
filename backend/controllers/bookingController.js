const { generateqr } = require('../utils/generate');
const Booking = require('../models/booking');

const generateQRCode = async (req, res) => {
  const { name, phoneNumber, vehicleNumber } = req.body;

  if (!name || !phoneNumber || !vehicleNumber) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Save to MongoDB
    const newBooking = new Booking({
      name,
      phoneNumber,
      vehicleNumber
    });
    console.log('Received booking:', { name, phoneNumber, vehicleNumber });
    console.log('Booking saved successfully to MongoDB');

    await newBooking.save();

    // Generate QR code
    const qrData = { name, phoneNumber, vehicleNumber };
    const qrCodeUrl = await generateqr(JSON.stringify(qrData));

    res.json({ qrCodeUrl });  // Send QR to frontend
  } catch (error) {
    console.error('Error in saving or generating QR:', error.message);
    res.status(500).json({ error: 'Failed to save and generate QR code' });
  }
};

module.exports = { generateQRCode };
