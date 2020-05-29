const controller = require('../controllers/product');
const {rootUrl} = require('../utility/constants')
module.exports = (app) => {
  

  app.post(rootUrl('product'), controller.create);

  app.get(rootUrl('products'), controller.findAll);

  app.get(rootUrl('product/:id'), controller.findPk);

  app.patch(rootUrl('product/:id'), controller.update);

  app.delete(rootUrl('product/:id'), controller.delete);
};