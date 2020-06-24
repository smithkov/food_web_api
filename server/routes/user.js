const controller = require("../controllers/user");
const { rootUrl } = require("../utility/constants");
const { auth } = require("../utility/global");
const { upload } = require("../utility/global");
module.exports = (app) => {
  app.post(rootUrl("user/register"), controller.signUp);

  app.post(rootUrl("user/socialRegister"), controller.socialSignIn);

  app.post(rootUrl("user/login"), controller.signIn);

  app.post(rootUrl("cart"), controller.addToCart);

  app.get(rootUrl("getCart/:shopName"), controller.getCart);

  app.get(rootUrl("users"), controller.findAll);

  app.get(rootUrl("user/isLogin"), auth, controller.isLogin);

  app.get(rootUrl("user/:id"), controller.findPk);

  app.patch(rootUrl("user/:id"), upload.single("photo"), controller.update);

  app.patch(
    rootUrl("user/photo/:id"),
    upload.single("photo"),
    controller.updatePhoto
  );

  app.delete(rootUrl("user/:id"), controller.delete);
};
