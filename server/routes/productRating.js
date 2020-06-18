const controller = require('../controllers/productRating');
const {rootUrl} = require('../utility/constants')
module.exports = (app) => {
  

  app.post(rootUrl('productRating'), controller.create);

  app.get(rootUrl('productRatings'), controller.findAll);

  app.get(rootUrl('productRating/:id'), controller.findPk);

  app.patch(rootUrl('productRating/:id'), controller.update);

  app.post(rootUrl('productRating/product'), controller.findByProduct);

  app.delete(rootUrl('productRating/:id'), controller.delete);
};