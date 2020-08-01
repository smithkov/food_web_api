const controller = require("../controllers/transaction");
const { rootUrl } = require("../utility/constants");
const { upload, auth } = require("../utility/global");

module.exports = (app) => {
  //upload.single('logo'),

  app.post(rootUrl("transaction"), auth, controller.create);

  app.post(rootUrl("user/transaction"), auth, controller.findTransactionByUser);

  app.post(rootUrl("shop/transaction"), auth, controller.findTransactionByShop);

  app.get(rootUrl("shop/transaction/:id"), auth, controller.findPk);

  app.post(rootUrl("stripePay"), auth, controller.createStripePayment )
};
