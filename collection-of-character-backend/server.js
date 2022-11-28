// import
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes/routes");
const cookirParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 2608;

// middleware
app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);
app.use(express.json());
app.use(cookirParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

// database connection
const DB_URI =
  process.env.DB_URI || "mongodb://localhost:27017/collection_character_db";
mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log(err);
  });

// roter prefix
app.use("/api/post", router);

// start server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
