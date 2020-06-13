const controller = require('../controllers/category');
const {rootUrl} = require('../utility/constants')
module.exports = (app) => {
  

  app.post(rootUrl('category'), controller.create);

  app.get(rootUrl('categories'), controller.findAll);

  app.get(rootUrl('categoriesByShop/:id'), controller.findByShopType);

  app.get(rootUrl('category/:id'), controller.findPk);

  app.patch(rootUrl('category/:id'), controller.update);

  app.delete(rootUrl('category/:id'), controller.delete);
};