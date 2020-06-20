const multer = require("multer");
const jwt = require("jsonwebtoken");
const { FAILED_AUTH } = require("../errors/statusCode");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/category");
  },
  filename: function (req, file, cb) {
    const filename = `${new Date().getTime()}${file.originalname}`;
    cb(null, filename);
  },
});
const fileFilter = (req, file, cb) => {
  // reject a file
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/webp"
  ) {
    cb(null, true);
  } else {
    throw new Error("Invalid image type");
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

const authenticateUser = (req, res, next) => {
  try {
    const decoded = jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.SECRET
    );
    req.userData = decoded;
    next();
  } catch (err) {
    return res.status(FAILED_AUTH).json({
      message: "Unauthorized access",
      error: true,
    });
  }
};
const duration = [
  { time: "5 mins", value:5 },
  { time: "10 mins", value:10 },
  { time: "15 mins", value:15 },
  { time: "20 mins", value:20 },
  { time: "25 mins", value:25 },
  { time: "30 mins", value:30 },
  { time: "35 mins", value:35 },
  { time: "40 mins", value:40 },
  { time: "45 mins", value:45 },
  { time: "50 mins", value:50 },
  { time: "55 mins", value:55 },
  { time: "60 mins", value:60 },
  { time: "80 mins", value:80 },
  { time: "120 mins", value:85 }
];
module.exports = {
  upload: upload,
  auth: authenticateUser,
  duration:duration
};
