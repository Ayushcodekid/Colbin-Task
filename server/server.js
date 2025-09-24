require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");

connectDB();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, true);
    },
    credentials: true, // allow cookies
  })
);app.use(cookieParser());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
