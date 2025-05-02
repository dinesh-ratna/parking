const express = require('express');
const router = express.Router();
const { generateQRCode } = require('../controllers/bookingController');

// Route to generate QR code
router.post('/generate-qr', generateQRCode);

module.exports = router;
