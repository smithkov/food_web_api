const controller = require("../controllers/shop");
const { rootUrl } = require("../utility/constants");
const { upload } = require("../utility/global");
module.exports = (app) => {
  //upload.single('logo'),

  app.post(
    rootUrl("shop"),
    upload.fields([
      { name: "logo", maxCount: 1 },
      { name: "banner", maxCount: 1 },
    ]),
    controller.create
  );

  app.post(rootUrl("create-shop"), controller.createShopInfo);

  app.get(rootUrl("shops"), controller.findAll);

  app.get(rootUrl("shop/duration"), controller.findDuration);

  app.post(rootUrl("shopByName"), controller.findShopByName);

  app.post(rootUrl("shopByUrl"), controller.findShopByUrl);

  app.post(rootUrl("contactUs"), controller.contactUs);

  app.get(rootUrl("shops/byUser/:id"), controller.findByUser);

  app.get(rootUrl("shop/:id"), controller.findPk);

  app.get(rootUrl("shop/activateByLink/:code"), controller.activateAccount);

  app.patch(rootUrl("shop/:id"), controller.update);

  app.patch(rootUrl("settings/:id"), controller.updateSettings);

  app.delete(rootUrl("shop/:id"), controller.delete);
};
