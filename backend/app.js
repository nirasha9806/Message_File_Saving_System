const cors = require("cors");
const express = require("express");
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5000",
    credentials: true,
  })
);

//routes

const userRoutes = require("./routes/user-route");

//use
app.use("/users", userRoutes);

module.exports = app;
