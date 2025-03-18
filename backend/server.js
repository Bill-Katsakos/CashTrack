require('dotenv').config();

const express = require("express");
const cors = require("cors");

const main = require("./config/connection");
const userRouter = require("./routes/userRouter");
const expenseRouter = require("./routes/expenseRouter");

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors());

// Connection to the database
main();

// Routes
app.use("/user", userRouter);
app.use("/expenses", expenseRouter);

app.listen(port, () => console.log(`Server is listening on port ${port}`));
// 🦖