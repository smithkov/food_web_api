const controller = require('../controllers/sponsorType');
const {rootUrl} = require('../utility/constants')
module.exports = (app) => {
  

  app.post(rootUrl('sponsorType'), controller.create);

  app.get(rootUrl('sponsorTypes'), controller.findAll);

  app.get(rootUrl('sponsorType/:id'), controller.findPk);

  app.patch(rootUrl('sponsorType/:id'), controller.update);

  app.delete(rootUrl('sponsorType/:id'), controller.delete);
};