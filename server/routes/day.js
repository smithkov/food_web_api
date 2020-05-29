const controller = require('../controllers/day');
const {rootUrl} = require('../utility/constants')
module.exports = (app) => {
  

  app.post(rootUrl('day'), controller.create);

  app.get(rootUrl('days'), controller.findAll);

  app.get(rootUrl('day/:id'), controller.findPk);

  app.patch(rootUrl('day/:id'), controller.update);

  app.delete(rootUrl('day/:id'), controller.delete);
};