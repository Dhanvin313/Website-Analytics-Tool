// index.js
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes"); // Import user routes

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/analyticsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

// Use user routes
app.use("/api/users", userRoutes); // Use user routes for user-related operations

// Handle undefined routes (Optional)
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
