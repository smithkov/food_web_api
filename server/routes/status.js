const controller = require('../controllers/status');
const {rootUrl} = require('../utility/constants')
module.exports = (app) => {
  

  app.post(rootUrl('status'), controller.create);

  app.get(rootUrl('statuses'), controller.findAll);

  app.get(rootUrl('status/:id'), controller.findPk);

  app.patch(rootUrl('status/:id'), controller.update);

  app.delete(rootUrl('status/:id'), controller.delete);
};