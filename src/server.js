
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();


// Middleware
app.use(cors({
  origin: "http://localhost:5173",
}));

app.use(express.json());

// Test route
app.use('/api/v1/auth', require('./routes/auth'));  



connectDB();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
