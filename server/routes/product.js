const controller = require("../controllers/product");
const { rootUrl } = require("../utility/constants");
const { upload } = require("../utility/global");
module.exports = (app) => {
  app.post(rootUrl("product"), upload.single("photo"), controller.create);

  app.post(rootUrl("product/byUser"), controller.findByUser);

  app.get(rootUrl("products/byShopId/:id"), controller.findByShop);

  app.get(rootUrl("front-page-meals"), controller.frontPageMeal);

  app.get(rootUrl("product/:id"), controller.findPk);

  app.patch(rootUrl("product/:id"), upload.single("image"), controller.update);

  app.delete(rootUrl("product/:id"), controller.delete);
};
