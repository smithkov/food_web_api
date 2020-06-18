const controller = require('../controllers/productRatingResponse');
const {rootUrl} = require('../utility/constants')
module.exports = (app) => {
  

  app.post(rootUrl('productRatingResponse'), controller.create);

  app.get(rootUrl('productRatingResponses'), controller.findAll);

  app.get(rootUrl('productRatingResponse/:id'), controller.findPk);

  app.patch(rootUrl('productRatingResponse/:id'), controller.update);

  app.delete(rootUrl('productRatingResponse/:id'), controller.delete);
};