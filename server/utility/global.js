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
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" ||file.mimetype === "image/webp") {
    cb(null, true);
  } else {
    throw new Error('Invalid image type')
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
    const decoded = jwt.verify(req.headers.authorization.split(" ")[1], process.env.SECRET);
    req.userData = decoded;
    next();
  } catch (err) {
    return res.status(FAILED_AUTH).json({
      message: "Unauthorized access",
      error: true,
    });
  }
  
};
module.exports = {
  upload: upload,
  auth: authenticateUser
};
