const controller = require('../controllers/subCategory');
const {rootUrl} = require('../utility/constants')
const {upload} = require('../utility/global')

module.exports = (app) => {

  app.post(rootUrl('subCategory'), upload.single('file'),controller.create);

  app.get(rootUrl('subCategories'), controller.findAll);

  app.get(rootUrl('subCategory/:id'), controller.findPk);

  app.patch(rootUrl('subCategory/:id'), controller.update);

  app.delete(rootUrl('subCategory/:id'), controller.delete);
};