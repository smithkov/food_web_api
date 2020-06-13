const controller = require('../controllers/shopType');
const {rootUrl} = require('../utility/constants');
const {auth} = require('../utility/global');
module.exports = (app) => {
  

  app.post(rootUrl('shopType'),auth, controller.create);

  app.get(rootUrl('shopTypes'), controller.findAll);

  app.get(rootUrl('shopType/:id'), controller.findPk);

  app.patch(rootUrl('shopType/:id'), controller.update);

  app.delete(rootUrl('shopType/:id'), controller.delete);
};