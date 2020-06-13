const controller = require('../controllers/origin');
const {rootUrl} = require('../utility/constants')
module.exports = (app) => {
  

  app.post(rootUrl('origin'), controller.create);

  app.get(rootUrl('origins'), controller.findAll);

  app.get(rootUrl('origin/:id'), controller.findPk);

  app.patch(rootUrl('origin/:id'), controller.update);

  app.delete(rootUrl('origin/:id'), controller.delete);
};