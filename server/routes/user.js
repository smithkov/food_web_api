const controller = require('../controllers/user');
const {rootUrl} = require('../utility/constants')
module.exports = (app) => {
  

  app.post(rootUrl('user'), controller.create);

  app.get(rootUrl('users'), controller.findAll);

  app.get(rootUrl('user/:id'), controller.findPk);

  app.patch(rootUrl('user/:id'), controller.update);

  app.delete(rootUrl('user/:id'), controller.delete);
};