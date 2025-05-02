const form = document.getElementById("bookingForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();  // Prevent default form submission

  // Collecting form data from browser
  const name = document.getElementById("name").value;
  const phoneNumber = document.getElementById("phoneNumber").value;
  const vehicleNumber = document.getElementById("vehicleNumber").value;

  const data = { name, phoneNumber, vehicleNumber };

  try {
    // Send the collected data to the backend
    const response = await fetch("/api/generate-qr", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),  // Send the data directly
    });

    const result = await response.json();

    if (response.ok) {
      console.log("QR code generated:", result.qrCodeUrl);

      // Dynamically update the QR code image in the HTML
      const qrCodeImage = document.getElementById("qrCodeImage");
      qrCodeImage.src = result.qrCodeUrl;  // Set the QR code URL as the image source

      // Show the QR code container
      document.getElementById("qrcode").style.display = "block";
    } else {
      console.error("Error:", result.error);
      alert("Failed to generate QR code.");
    }
  } catch (error) {
    console.error("Request error:", error);
    alert("An error occurred while booking the parking spot.");
  }
});





