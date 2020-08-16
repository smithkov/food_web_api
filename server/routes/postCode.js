const controller = require('../controllers/postCode');
const {rootUrl} = require('../utility/constants')
module.exports = (app) => {
  

  app.post(rootUrl('postCode'), controller.create);

  app.post(rootUrl('postCodesByShop'), controller.findByShop);

  // app.get(rootUrl('origin/:id'), controller.findPk);

  // app.patch(rootUrl('origin/:id'), controller.update);

  app.delete(rootUrl('postCode/:id'), controller.delete);
};