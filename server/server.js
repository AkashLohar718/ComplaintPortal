const express = require("express");
const cors = require("cors");
const dns = require("dns");
const complaintRoutes = require("./routes/complaintRoutes");
const authRoutes = require("./routes/authRoutes");

require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/complaints", complaintRoutes);

// Fix MongoDB SRV DNS resolution
dns.setServers(["8.8.8.8", "8.8.4.4"]);

connectDB();

app.get("/", (req, res) => {
  res.json({
    message: "Complaint Management System API is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});