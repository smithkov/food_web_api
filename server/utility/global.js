const aws = require('aws-sdk');
const multer = require("multer");
const multerS3 = require('multer-s3');
const jwt = require("jsonwebtoken");
const { FAILED_AUTH, OK } = require("../errors/statusCode");
const { ACCESS_TOKEN } = require("../utility/constants");

aws.config.update({
  secretAccessKey:process.env.S3SECRETKEY,
  accessKeyId:process.env.S3ACCESSKEY,
  region:"eu-west-2"
})
const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'|| file.mimetype === 'image/webp') {
      cb(null, true)
  } else {
      cb(new Error('Invalid Mime Type, only JPEG and PNG'), false);
  }
}
const upload = multer({
  fileFilter,
  storage: multerS3({
    s3,
    bucket: 'foodengo',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: 'foodengo_img'});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})


const authenticateUser = (req, res, next) => {
  try {
    const bearerHeader = req.headers.authorization;

    const bearer = bearerHeader.split(" ");
    const token = bearer[1];

    console.log(token + "---------------------------------------------token");
    if (token) {
      const decoded = jwt.verify(token, process.env.SECRET);
      req.userData = decoded;
      next();
    } else
      res.status(OK).json({
        data: null,
        error: true,
      });
  } catch (err) {
    return res.status(OK).json({
      data: null,
      error: true,
    });
  }
};
const duration = [
  { time: "5 mins", value: 5 },
  { time: "10 mins", value: 10 },
  { time: "15 mins", value: 15 },
  { time: "20 mins", value: 20 },
  { time: "25 mins", value: 25 },
  { time: "30 mins", value: 30 },
  { time: "35 mins", value: 35 },
  { time: "40 mins", value: 40 },
  { time: "45 mins", value: 45 },
  { time: "50 mins", value: 50 },
  { time: "55 mins", value: 55 },
  { time: "60 mins", value: 60 },
  { time: "80 mins", value: 80 },
  { time: "120 mins", value: 85 },
];
const daysOfWeek = () => {
  return [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
};
module.exports = {
  upload: upload,
  auth: authenticateUser,
  duration: duration,
  days: daysOfWeek,
};
