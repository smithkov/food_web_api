const controller = require('../controllers/social');
const {rootUrl} = require('../utility/constants')
module.exports = (app) => {
  

  app.post(rootUrl('social'), controller.create);

  app.get(rootUrl('socials'), controller.findAll);

  app.get(rootUrl('social/:id'), controller.findPk);

  app.patch(rootUrl('social/:id'), controller.update);

  app.delete(rootUrl('social/:id'), controller.delete);
};