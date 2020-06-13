const controller = require('../controllers/role');
const {rootUrl} = require('../utility/constants')
module.exports = (app) => {
  

  app.post(rootUrl('role'), controller.create);

  app.get(rootUrl('roles'), controller.findAll);

  app.get(rootUrl('role/:id'), controller.findPk);

  app.patch(rootUrl('role/:id'), controller.update);

  app.delete(rootUrl('role/:id'), controller.delete);
};