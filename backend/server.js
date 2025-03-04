const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors"); 
// const axios = require("axios");

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




app.get("/user", async (req, res) => {
  try {
    let user = await User.find()
    return res.send(user);
  } catch (error) {
    return res.send(error);
  }
});

app.get("/expenses", async (req, res) => {
  try {
    let expenses = await Expenses.find()
    return res.send(expenses);
  } catch (error) {
    return res.send(error);
  }
});



// __________Create an Expense________
const createExpense = async (req, res) => {
    try {
    //   let userId = req.user.userId;
    //   const { description, date, amount } = req.body;
  
    //   let createdExpense = await Expenses.create({
    //     description,
    //     date,
    //     amount,
    //     user: userId,
    //   });
      let createdExpense = await Expenses.create(req.body);
  
      res.status(200).send({ msg: "An expense is been added successfully 🤑", createdExpense });
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
app.post("/expenses/add", createExpense);


// __________Delete expense ________
const deleteExpense = async (req, res) => {
    try {

      const deleteExpense = await Expenses.findByIdAndDelete(req.params.id);
      if (!deleteExpense) {
          return res.status(404).json({ msg: "Expense not found." });
        }
        return res.status(200).json({ msg: "Expense successfully deleted." });

    } catch (error) {
      return res.status(500).json({ msg: "Server error", error: error.message });
    }
  };
  
  app.delete("/expenses/delete/:id", deleteExpense);













// _________________Register Route_________________

const registerUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.send({ msg: "All fields are required" });
      }
      let isUserExist = await User.findOne({ email });
      if (isUserExist) {
        return res.send({
          msg: "User already exists. Please login, Or register with new email",
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
  
app.post("/user/register", registerUser);
  
// ______________Login Route____________

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
        // ___________token__________

        let payload = {
        userId: oldRegisteredUser._id,
        email: oldRegisteredUser.email,
        };
        let token = await jwt.sign(payload, process.env.SECRET_KEY
            // ,{
            //  expiresIn: "1h", // expiresIn: "1h" 
            // }
        );

        return res.send({ msg: "Login Successfully", token }); 
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Internal server error" });
    }
};

app.post("/user/login", loginUser);

app.listen(port, () => console.log(`Server is start listening on port ${port}`));