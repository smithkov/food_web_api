const User = require("../models").User;
const Role = require("../models").Role;
const Query = new require("../queries/crud");
const validate = require("../validations/validation");
const { system } = require("../utility/constants");
const Mail = require("../utility/mail");
const { ACCESS_TOKEN } = require("../utility/constants");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const secret = process.env.SECRET;
const {
  SERVER_ERROR,
  OK,
  VALIDATION_ERROR,
  Messages,
  FAILED_AUTH,
} = require("../errors/statusCode");

const query = new Query(User);
const roleQuery = new Query(Role);
const bcrypt = require("bcryptjs");
const { savedSuccess, serverError } = Messages;

module.exports = {
  signUp: async (req, res) => {
    const { password, email, firstName, lastName } = req.body;

    //const { error, value } = validate.nameSchema({ name: "nnamdi" });

    const role = await roleQuery.findOne({ name: "Customer" });

    const emailExist = await query.findOne({ email: email });
    if (!emailExist) {
      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          return res
            .status(SERVER_ERROR)
            .send({ message: serverError, error: true });
        } else {
          const newUser = await query.add({
            email: email,
            password: hash,
            firstName: firstName,
            source: system,
            lastName: lastName,
            roleId: role.id,
          });
          const user = await query.findPK(newUser.id);
          const token = jwt.sign(
            {
              email: user.email,
              id: user.id,
              firstName: user.firstName,
              role: user.Role.name,
              photo: user.photo,
              shopId: user.shops.length > 0 ? user.shops[0].id : null,
            },
            secret,
            {
              expiresIn: "24h",
            }
          );
          res.cookie(ACCESS_TOKEN, token, {
            maxAge: 86400 * 1000,
            httpOnly: true,
          });
          return res.status(OK).send({
            error: false,
            token: token,
            data: {
              id: user.id,
              firstName: user.firstName,
              fullName: `${user.firstName} ${user.lastName}`,
              role: user.Role.name,
              shopId: null,
            },
          });
        }
      });
    } else
      return res
        .status(VALIDATION_ERROR)
        .send({ message: "Email already exist!", error: true });

    //return res.status(VALIDATION_ERROR).send({ message: error, error: true });
  },
  signIn: async (req, res) => {
    const failedLoginMessage = "Email or password is incorrect.";
    const { email, password } = req.body;

    const user = await query.findOne({ email: email });

    if (!user) {
      return res
        .status(FAILED_AUTH)
        .send({ error: true, message: failedLoginMessage });
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res
          .status(FAILED_AUTH)
          .send({ error: true, message: failedLoginMessage });
      }
      if (result) {
        const token = jwt.sign(
          {
            email: user.email,
            id: user.id,
            firstName: user.firstName,
            role: user.Role.name,
            photo: user.photo,
            shopId: user.shops.length > 0 ? user.shops[0].id : null,
          },
          secret,
          {
            expiresIn: "24h",
          }
        );
        // res.cookie(ACCESS_TOKEN, token, {
        //   maxAge: 86400 * 1000,
        //   httpOnly: true,
        // });
        return res.status(OK).send({
          error: false,
          token: token,
          data: {
            id: user.id,
            photo: user.photo,
            firstName: user.firstName,
            fullName: `${user.firstName} ${user.lastName}`,
            role: user.Role.name,
            shopId: user.shops.length > 0 ? user.shops[0].id : null,
          },
        });
      }
    });
  },

  socialSignIn: async (req, res) => {
    const failedLoginMessage = "Email or password is incorrect.";
    const { email, password, firstName, lastName, source } = req.body;
    const role = await roleQuery.findOne({ name: "Customer" });

    const user = await query.findOne({ email: email });
    if (!user) {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          return res
            .status(SERVER_ERROR)
            .send({ message: serverError, error: true });
        } else {
          return query
            .add({
              email,
              password: hash,
              firstName,
              lastName,
              roleId: role.id,
              source,
            })
            .then(async (user) => {
              const newUser = await query.findPK(user.id);
              const token = jwt.sign(
                {
                  email: user.email,
                  id: user.id,
                  firstName: user.firstName,
                  role: user.Role.name,
                  photo: user.photo,
                },
                secret,
                {
                  expiresIn: "48h",
                }
              );
              res.cookie(ACCESS_TOKEN, token, {
                maxAge: 86400 * 1000,
                httpOnly: true,
              });
              res.status(OK).send({
                error: false,
                token: token,
                data: {
                  email: newUser.email,
                  id: newUser.id,
                  photo: newUser.photo,
                  firstName: newUser.firstName,
                  fullName: `${newUser.firstName} ${newUser.lastName}`,
                  role: newUser.Role.name,
                  shopId: newUser.shops.length > 0 ? user.shops[0].id : null,
                },
              });
            })
            .catch((error) =>
              res
                .status(SERVER_ERROR)
                .send({ error: true, message: Messages.serverError })
            );
        }
      });
    } else {
      bcrypt.compare(password, user.password, async (err, result) => {
        if (err) {
          return res
            .status(FAILED_AUTH)
            .send({ error: true, message: failedLoginMessage });
        }
        if (result) {
          const newUser = await query.findPK(user.id);
          const token = jwt.sign(
            {
              email: newUser.email,
              id: newUser.id,
              firstName: newUser.firstName,
              role: newUser.Role.name,
              photo: newUser.photo,
            },
            secret,
            {
              expiresIn: "48h",
            }
          );
          res.cookie(ACCESS_TOKEN, token, {
            maxAge: 86400 * 1000,
            httpOnly: true,
          });

          return res.status(OK).send({
            error: false,
            token: token,
            data: {
              email: user.email,
              id: user.id,
              firstName: user.firstName,
              photo: user.photo,
              fullName: `${user.firstName} ${user.lastName}`,
              role: user.Role.name,
              shopId: user.shops.length > 0 ? user.shops[0].id : null,
            },
          });
        }
      });
    }
  },
  hasExpired: async (req, res) => {
    try {
      const id = req.params.id;

      const user = await query.findPK(id);
      let hasExpired = false;
      if (user) {
        const expiry = user.expiry;
        const currentDate = new Date();
        if (currentDate > expiry) hasExpired = true;
      }

      res.status(OK).send({ hasExpired });
    } catch (err) {
      console.log(err);
      res.status(SERVER_ERROR).send({ hasExpired: true });
    }
  },
  logout(req, res) {
    res.clearCookie(ACCESS_TOKEN);
    return res.status(OK).send({ error: false, data: id });
  },
  delete(req, res) {
    const id = req.params.id;
    return query
      .delete(id)
      .then((user) => res.status(OK).send({ error: false, data: id }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },
  findEmail(req, res) {
    const email = req.body.email;
    return query
      .findOne({ email })
      .then((user) => {
        res.status(OK).send({
          hasEmail: user ? true : false,
          message: `${email} has already been taken.`,
        });
      })
      .catch((error) =>
        res.status(OK).send({ error: true, message: Messages.serverError })
      );
  },
  isLogin(req, res) {
    res.status(OK).send({ error: false, data: req.userData });
  },

  addToCart(req, res) {
    const { shopName, data } = req.body;
    res.cookie(shopName, data, { maxAge: 86400 * 1000, httpOnly: true });

    res.status(OK).send();
  },

  getCart(req, res) {
    const shopName = req.params.shopName;
    const shopCookie = req.cookies[shopName];

    if (shopCookie) res.status(OK).send({ data: shopCookie });
    else res.status(OK).send({ data: null });
  },

  findPk(req, res) {
    const id = req.params.id;
    return query
      .findPK(id)
      .then((user) => res.status(OK).send({ error: false, data: user }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },
  updateAddress(req, res) {
    const { firstAddress, secondAddress, postCode, phone } = req.body;

    const userId = req.userData.id;
    return query
      .update(userId, {
        firstAddress,
        secondAddress,
        postCode,
        phone,
      })
      .then((user) =>
        res.status(OK).send({ error: false, message: savedSuccess, data: user })
      )
      .catch((error) =>
        res.status(SERVER_ERROR).send({ error: true, message: serverError })
      );
  },
  update(req, res) {
    const {
      firstName,
      lastName,
      email,
      firstAddress,
      secondAddress,
      postCode,
      phone,
      cityId,
    } = req.body;

    const userId = req.params.id;

    const photo = req.file ? req.file.location : "";
    const obj = {
      firstName,
      lastName,
      email,
      firstAddress,
      secondAddress,
      postCode,
      phone,
      photo,
    };
    if (cityId !== "null") {
      obj.cityId = cityId;
    }
    return query
      .update(userId, obj)
      .then((user) =>
        res.status(OK).send({ error: false, message: savedSuccess, data: user })
      );
  },
  updatePhoto(req, res) {
    const id = req.params.id;
    if (req.file) {
      return query
        .update(id, { photo: req.file.location })
        .then((user) => res.status(OK).send({ error: false, data: user }))
        .catch((error) =>
          res.status(SERVER_ERROR).send({ error: true, message: serverError })
        );
    }
    res.status(SERVER_ERROR).send({ error: true, message: serverError });
  },

  findAll(req, res) {
    return query
      .findAll()
      .then((user) => res.status(OK).send({ error: false, data: user }))
      .catch((error) =>
        res.status(SERVER_ERROR).send({ error: true, message: serverError })
      );
  },
};
