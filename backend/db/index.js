const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

//User and Task models

const userSchema = new mongoose.Schema({
  name: String,
  email: {
	type: String,
	unique: true,
  },
  password: String,
});

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  user: {
	type: mongoose.Schema.Types.ObjectId,
	ref: "User",
  },
  status: {
	type: String,
	enum: ["To Do", "In Progress", "Done"],
	default: "To Do",
  }
});

const User = mongoose.model("User", userSchema);
const Task = mongoose.model("Task", taskSchema);

module.exports = { User, Task };
