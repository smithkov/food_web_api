const express = require("express");
const logger = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger("dev"));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
//app.use(express.static(path.join(__dirname, "uploads")));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Require our routes into the application.
const refPath = "./server/routes/"

require(`${refPath}category`)(app);
require(`${refPath}subCategory`)(app);
require(`${refPath}shopType`)(app);
require(`${refPath}city`)(app);
require(`${refPath}day`)(app);
require(`${refPath}unit`)(app);
require(`${refPath}status`)(app);
require(`${refPath}sponsorType`)(app);
require(`${refPath}product`)(app);
app.get("*", (req, res) =>
  res.status(200).send({
    message: "Welcome to the beginning of nothingness.",
  })
);
module.exports = app;
