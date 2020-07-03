const controller = require("../controllers/user");
const { rootUrl } = require("../utility/constants");
const { auth } = require("../utility/global");
const { upload } = require("../utility/global");
module.exports = (app) => {
  app.post(rootUrl("user/register"), controller.signUp);

  app.post(rootUrl("user/socialRegister"), controller.socialSignIn);

  app.post(rootUrl("user/login"), controller.signIn);

  app.get(rootUrl("users"), controller.findAll);

  app.get(rootUrl("user/isLogin"), auth, controller.isLogin);

  app.get(rootUrl("user/:id"), controller.findPk);

  app.patch(rootUrl("user/:id"), upload.single("photo"), controller.update);

  app.post(rootUrl("userAddress/update"),auth, controller.updateAddress);

  app.patch(
    rootUrl("user/photo/:id"),
    upload.single("photo"),
    controller.updatePhoto
  );

  app.delete(rootUrl("user/:id"), controller.delete);
};
