// index.js
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes"); // Import user routes
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors'); // Import the CORS package

// Initialize Express
const app = express();
const port = 8080;

app.use(cors({
    origin: 'http://localhost:3000', // Allow your frontend origin
    credentials: true, // Allow cookies to be sent with requests
}));

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodburlhere', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB:', err));

// Set up session middleware
app.use(session({
    secret: 'yourSecretKey', // Replace with a strong secret key
    resave: false,  // Prevents re-saving unchanged sessions
    saveUninitialized: false,  // Don't save empty sessions
    store: MongoStore.create({ mongoUrl: 'mongodburlhere' }),  // Store sessions in MongoDB
    cookie: { maxAge: 3600000  }  // Session cookie valid for 1 hour
}));

app.get('/dashboard', (req, res) => {
    if (req.session.username) {
        res.json({ message: `Welcome back, ${req.session.username}` });
    } else {
        res.status(401).json({ message: 'Unauthorized, please log in' });
    }
});

// Use user routes
app.use("/api/users", userRoutes); // Use user routes for user-related operations

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


// Handle undefined routes (Optional)
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});