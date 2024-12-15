const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const hotelDataAddedToDBRouter = require("./routes/dataimport.router");
const categoryDataAddedToDBRouter = require("./routes/categoryimport.router");
const hotelRouter = require("./routes/hotel.router");
const categoryRouter = require("./routes/category.router");
const singleHoterRouter = require("./routes/singlehotel.router");
const authRouter = require("./routes/auth.router");
const wishlistRouter = require("./routes/wishlist.router");

const connectDB = require("./config/dbconfig");

const app = express();

// Updated CORS configuration
app.use(cors({
  origin: 'http://localhost:3000', // Your React frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
connectDB();

const PORT = 3500;

// Test route
app.get("/", (req, res) => {
  res.send("Hello Geeks");
});

// API routes
app.use("/api/hoteldata", hotelDataAddedToDBRouter);
app.use("/api/categorydata", categoryDataAddedToDBRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/category", categoryRouter);
app.use("/api/hotels", singleHoterRouter);
app.use("/api/auth", authRouter);
app.use("/api/wishlist", wishlistRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

mongoose.connection.once("open", () => {
  console.log("Connected to DB");
  app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port ${process.env.PORT || PORT}`);
  });
});