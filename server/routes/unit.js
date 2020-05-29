const controller = require('../controllers/unit');
const {rootUrl} = require('../utility/constants')
module.exports = (app) => {
  

  app.post(rootUrl('unit'), controller.create);

  app.get(rootUrl('units'), controller.findAll);

  app.get(rootUrl('unit/:id'), controller.findPk);

  app.patch(rootUrl('unit/:id'), controller.update);

  app.delete(rootUrl('unit/:id'), controller.delete);
};