const express = require('express');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcrypt'); // Added missing import
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 3000;
const connectDB = require('./config/mongo');
connectDB();  // Connect to MongoDB

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Replaces bodyParser.urlencoded
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // set to true if using HTTPS
}));

// Serve login.html on root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'login.html'));
});

// Serve static files
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// API Routes
const bookingRoutes = require('./routes/bookingRoutes');
app.use('/api', bookingRoutes);

// User model - corrected path
const User = require('./models/User');





// const bcrypt = require("bcrypt");
// const User = require("./models/User"); // Make sure path is correct

// Signup Route
app.post('/signup', async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullName, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error during signup" });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });

    req.session.userId = user._id;
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: "Server error during login" });
  }
});






app.get('/api/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true, redirectUrl: '/index.html' });
});

app.get('/api/check-auth', (req, res) => {
  res.json({ isAuthenticated: !!req.session.userId });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});