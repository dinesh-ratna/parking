const QRCode = require('qrcode');

// Function to generate QR code as a Data URL 
function generateqr(data) {
  return new Promise((resolve, reject) => {
    QRCode.toDataURL(data, (err, url) => {
      if (err) {
        reject('Failed to generate QR code');
      }
      resolve(url);  // Returns the QR code as a Data URL 
    });
  });
}

module.exports = {
  generateqr
};
