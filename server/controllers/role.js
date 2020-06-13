const Role = require("../models").Role;
const Query = new require("../queries/crud");
const validate = require("../validations/validation");
const { SERVER_ERROR, OK, VALIDATION_ERROR } = require("../errors/statusCode");
const query = new Query(Role);

module.exports = {
  create(req, res) {
    const name = req.body.name;

    const { error, value } = validate.nameSchema({ name: name });

    if (!error) {
      return query
        .add({ name: name})
        .then((role) => res.status(OK).send(role))
        .catch((error) => res.status(SERVER_ERROR).send(error));
    } else {
      return res.status(VALIDATION_ERROR).send({ message: error, error: true });
    }
  },
  delete(req, res) {
    const id = req.params.id;
    return query
      .delete(id)
      .then((role) => res.status(OK).send({ error: false, data: id }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  findPk(req, res) {
    const id = req.params.id;
    return query
      .findPK(id)
      .then((role) => res.status(OK).send({ error: false, data: role }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  update(req, res) {
    const name = req.body.name;
    const id = req.params.id;
    return query
      .update(id, { name: name })
      .then((role) => res.status(OK).send({ error: false, data: role }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  findAll(req, res) {
    return query
      .findAll()
      .then((role) => res.status(OK).send({ error: false, data: role }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },
};
