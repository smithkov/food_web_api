const User = require("../models").User;
const Role = require("../models").Role;
const Query = new require("../queries/crud");
const validate = require("../validations/validation");
const { system } = require("../utility/constants");
const jwt = require("jsonwebtoken");

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
const bcrypt = require("bcrypt");
const { savedSuccess, serverError } = Messages;

module.exports = {
  signUp: async (req, res) => {
    const { password, email, firstName, lastName } = req.body;

    const { error, value } = validate.nameSchema({ name: "nnamdi" });

    if (!error) {
      const role = await roleQuery.findOne({ name: "Customer" });
      console.log(role);

      const emailExist = await query.findOne({ email: email });
      if (!emailExist) {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            return res
              .status(SERVER_ERROR)
              .send({ message: serverError, error: true });
          } else {
            return query
              .add({
                email: email,
                password: hash,
                firstName: firstName,
                source: system,
                lastName: lastName,
                roleId: role.id,
              })
              .then((user) => res.status(OK).send(user))
              .catch((error) => res.status(SERVER_ERROR).send(error));
          }
        });
      } else
        return res
          .status(VALIDATION_ERROR)
          .send({ message: "Email already exist!", error: true });

      //return res.status(VALIDATION_ERROR).send({ message: error, error: true });
    } else {
      return res.status(VALIDATION_ERROR).send({ message: error, error: true });
    }
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
          },
          secret,
          {
            expiresIn: "1h",
          }
        );
        return res.status(OK).send({
          error: false,
          token: token,
          data: {
            email: user.email,
            id: user.id,
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
    console.log("------------------------------------------");
    console.log(req.body);
    console.log("------------------------------------------");
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
            .then((user) => {
              
              const token = jwt.sign(
                {
                  email: email,
                  id: password,
                },
                secret,
                {
                  expiresIn: "1h",
                }
              );
              res.status(OK).send({
                error: false,
                token: token,
                data: {
                  email: user.email,
                  id: user.id,
                  // fullName: `${user.firstName} ${user.lastName}`,
                  // role: user.Role.name,
                  // shopId: user.shops.length > 0 ? user.shops[0].id : null,
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
            },
            secret,
            {
              expiresIn: "1h",
            }
          );
          return res.status(OK).send({
            error: false,
            token: token,
            data: {
              email: user.email,
              id: user.id,
              fullName: `${user.firstName} ${user.lastName}`,
              role: user.Role.name,
              shopId: user.shops.length > 0 ? user.shops[0].id : null,
            },
          });
        }
      });
    }
  },
  delete(req, res) {
    const id = req.params.id;
    return query
      .delete(id)
      .then((user) => res.status(OK).send({ error: false, data: id }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  isLogin(req, res) {
    const id = req.body.id;
    return query
      .findPK(id)
      .then((user) => res.status(OK).send({ error: false, data: user }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },
  findPk(req, res) {
    const id = req.params.id;
    return query
      .findPK(id)
      .then((user) => res.status(OK).send({ error: false, data: user }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  update(req, res) {
    const {
      firstName,
      lastName,
      email,
      firstAddress,
      secondAddress,
      postCode,
      cityId,
    } = req.body;
    const id = req.params.id;

    const photo = req.file?req.file.filename:"";
    return query
      .update(id, {
        firstName,
        lastName,
        email,
        firstAddress,
        secondAddress,
        postCode,
        cityId,
        photo
      })
      .then((user) =>
        res.status(OK).send({ error: false, message: savedSuccess, data: user })
      )
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },
  updatePhoto(req, res) {
    const id = req.params.id;
    if (req.file) {
      return query
        .update(id, { photo: req.file.filename })
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
