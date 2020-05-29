const controller = require('../controllers/city');
const {rootUrl} = require('../utility/constants')
module.exports = (app) => {
  

  app.post(rootUrl('city'), controller.create);

  app.get(rootUrl('cities'), controller.findAll);

  app.get(rootUrl('city/:id'), controller.findPk);

  app.patch(rootUrl('city/:id'), controller.update);

  app.delete(rootUrl('city/:id'), controller.delete);
};