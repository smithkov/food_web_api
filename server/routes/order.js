const controller = require('../controllers/order');
const {rootUrl} = require('../utility/constants');
module.exports = (app) => {
  

  app.post(rootUrl('cart'), controller.create);

  app.get(rootUrl('retriveCartByShopId/:shopId'), controller.findByShopId);

  app.post(rootUrl('retriveCartByTempId'), controller.findByTempId);

  app.post(rootUrl('order/messageUpdate'), controller.updateMessage);

  app.delete(rootUrl('order/:id'), controller.delete);
};