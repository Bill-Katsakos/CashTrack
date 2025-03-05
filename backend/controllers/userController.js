const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltsRound = Number(process.env.SALT_ROUND) || 10;

// Test route to see all users (app.get("/user/test", ...))
const getTestUsers = async (req, res) => {
  try {
    let user = await User.find();
    return res.send(user);
  } catch (error) {
    return res.send(error);
  }
};

// Register
const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.send({ msg: "All fields are required" });
    }

    let isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.send({
        msg: "User already exists. Please login, or register with new email",
      });
    }

    let hashedPassword = await bcrypt.hash(password, saltsRound);
    await User.create({ email, password: hashedPassword });
    return res.send({ msg: "Registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal server error" });
  }
};

// Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.send({ msg: "All fields are required" });
    }

    let oldRegisteredUser = await User.findOne({ email });
    if (!oldRegisteredUser) {
      return res.send({ msg: "User not found, please register first." });
    }

    let isPasswordCorrect = await bcrypt.compare(
      password,
      oldRegisteredUser.password
    );
    if (!isPasswordCorrect) {
      return res.send({ msg: "Wrong password." });
    }

    // Create JWT
    let payload = {
      userId: oldRegisteredUser._id,
      email: oldRegisteredUser.email,
    };
    let token = jwt.sign(payload, process.env.SECRET_KEY);

    return res.send({ msg: "Login Successfully", token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal server error" });
  }
};

module.exports = { getTestUsers, registerUser, loginUser };
// 🦖