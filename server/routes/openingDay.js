const controller = require('../controllers/openingDay');
const {rootUrl} = require('../utility/constants')
module.exports = (app) => {
  

  app.post(rootUrl('openingDay'), controller.create);

  app.post(rootUrl('openingDaysByShop'), controller.findAllByShop);

};