const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const trainerRoutes = require("./routes/trainerRoutes");
app.use("/api/trainers", trainerRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.log("MongoDB connection error ❌:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
