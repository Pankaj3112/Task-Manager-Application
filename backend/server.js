const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const cors = require("cors");
require("./db");

// Middleware
app.use(express.json());

app.use(cors());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/tasks", require("./routes/tasks"));

app.use("/", (req, res) => {
  return res.status(200).json({ message: "Server is up and running." });
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
