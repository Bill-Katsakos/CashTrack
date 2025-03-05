const mongoose = require("mongoose");

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB is connected successfully");
  } catch (err) {
    console.log(err);
  }
}

module.exports = main;
// 🦖