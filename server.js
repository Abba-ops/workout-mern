require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const workoutRoutes = require("./routes/workoutRoutes");
const userRoutes = require("./routes/userRoutes");
const colors = require("colors");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

app.listen(PORT, () =>
  console.log(
    `Server running ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
