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

  app.get(rootUrl("shops"), controller.findAll);

  app.get(rootUrl("shops/byUser/:id"), controller.findByUser);

  app.get(rootUrl("shop/:id"), controller.findPk);

  app.patch(rootUrl("shop/:id"), controller.update);

  app.delete(rootUrl("shop/:id"), controller.delete);
};
