const controller = require('../controllers/ratingResponse');
const {rootUrl} = require('../utility/constants')
module.exports = (app) => {
  

  app.post(rootUrl('ratingResponse'), controller.create);

  app.get(rootUrl('ratingResponses'), controller.findAll);

  app.get(rootUrl('ratingResponse/:id'), controller.findPk);

  app.patch(rootUrl('ratingResponse/:id'), controller.update);

  app.delete(rootUrl('ratingResponse/:id'), controller.delete);
};