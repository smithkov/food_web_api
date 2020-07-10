const controller = require("../controllers/soldProduct");
const { rootUrl } = require("../utility/constants");
module.exports = (app) => {
  app.post(rootUrl("soldProductByShop"), controller.findAllByShop);

  app.get(rootUrl("category/:id"), controller.findPk);

  app.patch(rootUrl("category/:id"), controller.update);

  app.delete(rootUrl("category/:id"), controller.delete);
};
