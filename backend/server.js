const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors"); 
const axios = require("axios");

const authMiddleware = require("./middleware/auth");

const port = 8000;
const app = express();
const URI = process.env.MONGODB_URI;
const saltsRound = Number(process.env.SALT_ROUND);

// middleware / parser
app.use(express.json());
app.use(cors());

// connection
main()
  .then(() => console.log("DB is connected successfully"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(URI);
}


// User schema

const userSchema = new mongoose.Schema(
    {
      email: String,
      password: String,
    },
    {
      timestamps: true,
    }
);

// User Model
const User = mongoose.model("User", userSchema);


// ___________Expenses schema_________
const expensesSchema = new mongoose.Schema({
    description: String,
    date: String,
    amount: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  });
  

// Expenses Model
const Expenses = mongoose.model("Expenses", expensesSchema);




























app.listen(port, () => console.log(`Server is start listening on port ${port}`));