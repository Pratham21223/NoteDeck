require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const notesRoutes = require("./routes/notesRoute");
const authRoute = require("./routes/authRoute");
const aiRoutes = require("./routes/aiRoute");

const app = express();
const PORT = process.env.PORT || 3000;
const uri =
  process.env.MONGO_URL || "mongodb://127.0.0.1:27017/notemaster";

app.use(cors());
app.use(express.json());

// ✅ Connect MongoDB FIRST
mongoose
  .connect(uri)
  .then(() => {
    console.log("✅ MongoDB connected successfully!");

    // ✅ Register routes AFTER DB connection
    app.use("/notes", notesRoutes);
    app.use("/auth", authRoute);
    app.use("/ai", aiRoutes);

    // ✅ Start server AFTER DB is ready
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1); // stop server if DB fails
  });
