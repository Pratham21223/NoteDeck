require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const uri = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/notemaster";
const notesRoutes = require("./routes/notesRoute");
const authRoute = require("./routes/authRoute");
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log("Server Started");
  mongoose
    .connect(uri)
    .then(() => console.log("MongoDB connected successfully!"))
    .catch((err) => {
      console.log("MongoDB connection error:", err);
      console.log("Connecting to local host");
      uri = "mongodb://127.0.0.1:27017/notemaster";
    });
});

app.use("/notes", notesRoutes);
app.use("/auth", authRoute);
