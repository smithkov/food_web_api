const controller = require('../controllers/rating');
const {rootUrl} = require('../utility/constants')
module.exports = (app) => {
  

  app.post(rootUrl('rating'), controller.create);

  app.get(rootUrl('ratings'), controller.findAll);

  app.get(rootUrl('rating/:id'), controller.findPk);

  app.patch(rootUrl('rating/:id'), controller.update);

  app.post(rootUrl('rating/shop'), controller.findByShop);

  app.delete(rootUrl('rating/:id'), controller.delete);
};