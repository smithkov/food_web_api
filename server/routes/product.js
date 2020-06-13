const controller = require('../controllers/product');
const {rootUrl} = require('../utility/constants');
const {upload} = require('../utility/global');
module.exports = (app) => {
  

  app.post(rootUrl('product'),upload.array('image', 12), controller.create);

  app.get(rootUrl('product/category/:id'), controller.findByCategory);

  app.post(rootUrl('product/byUser'), controller.findByUser);

  app.get(rootUrl('products/byShopId/:id'), controller.findByShop);

  app.get(rootUrl('product/origin/:id'), controller.findByOrigin);

  app.get(rootUrl('products'), controller.findAll);

  app.get(rootUrl('product/:id'), controller.findPk);

  app.patch(rootUrl('product/:id'), controller.update);

  app.delete(rootUrl('product/:id'), controller.delete);
};