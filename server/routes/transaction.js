const controller = require("../controllers/transaction");
const { rootUrl } = require("../utility/constants");
const { upload, auth } = require("../utility/global");

module.exports = (app) => {
  //upload.single('logo'),

  app.post(rootUrl("transaction"), auth, controller.create);

  app.post(rootUrl("user/transaction"), auth, controller.findTransactionByUser);
};
