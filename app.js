const express = require("express");
const logger = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();
var cors = require("cors");
const { ACCESS_TOKEN } = require("./server/utility/constants");

// Set up the express app
const app = express();

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
// Log requests to the console.
app.use(logger("dev"));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
//app.use(express.static(path.join(__dirname, "uploads")));
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const cookieExtractor = (res) => {
  let token = null;
  if (req && req.cookies) {
    console.log("access_token", req.cookies[ACCESS_TOKEN]);
    token = req.cookies[ACCESS_TOKEN];
  } else return token;
};

// Require our routes into the application.
const refPath = "./server/routes/";

require(`${refPath}category`)(app);
require(`${refPath}subCategory`)(app);
require(`${refPath}city`)(app);
require(`${refPath}unit`)(app);
require(`${refPath}status`)(app);
require(`${refPath}sponsorType`)(app);
require(`${refPath}product`)(app);
require(`${refPath}user`)(app);
require(`${refPath}role`)(app);
require(`${refPath}origin`)(app);
require(`${refPath}shop`)(app);
require(`${refPath}social`)(app);
require(`${refPath}rating`)(app);
require(`${refPath}ratingResponse`)(app);
require(`${refPath}productRating`)(app);
require(`${refPath}productRatingResponse`)(app);
require(`${refPath}order`)(app);
require(`${refPath}transaction`)(app);
require(`${refPath}soldProduct`)(app);
require(`${refPath}openingDay`)(app);
app.use((err, req, res, next) => res.json(err));

app.set("port", process.env.PORT || 8000);

app.listen(app.get("port"), function() {
  console.log("Server started on port " + app.get("port"));
});

module.exports = app;
