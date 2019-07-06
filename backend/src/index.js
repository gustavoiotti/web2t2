require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();

/**
 * Database setup
 * mongoose.connect(config.DB,{ useMongoClient:true });
 */
mongoose.connect( 'mongodb://localhost:27017/upload',
  //process.env.MONGO_URL,
  {
    useNewUrlParser: true
    //useMongoClient:true
  }
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
);

app.use(require("./routes"));

app.listen(3000);
