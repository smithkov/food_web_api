const controller = require('../controllers/socialType');
const {rootUrl} = require('../utility/constants')
module.exports = (app) => {
  

  app.post(rootUrl('socialType'), controller.create);

  app.get(rootUrl('socialTypes'), controller.findAll);

  app.get(rootUrl('socialType/:id'), controller.findPk);

  app.patch(rootUrl('socialType/:id'), controller.update);

  app.delete(rootUrl('socialType/:id'), controller.delete);
};