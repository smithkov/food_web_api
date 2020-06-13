const Social = require("../models").Social;
const Query = new require("../queries/crud");
const validate = require("../validations/validation");
const { SERVER_ERROR, OK, VALIDATION_ERROR } = require("../errors/statusCode");
const query = new Query(Social);

module.exports = {
  create(req, res) {
    const {name, icon} = req.body;

    const { error, value } = validate.nameSchema({ name: name });

    if (!error) {
      return query
        .add({ name, icon})
        .then((social) => res.status(OK).send(social))
        .catch((error) => res.status(SERVER_ERROR).send(error));
    } else {
      return res.status(VALIDATION_ERROR).send({ message: error, error: true });
    }
  },
  delete(req, res) {
    const id = req.params.id;
    return query
      .delete(id)
      .then((social) => res.status(OK).send({ error: false, data: id }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  findPk(req, res) {
    const id = req.params.id;
    return query
      .findPK(id)
      .then((social) => res.status(OK).send({ error: false, data: social }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  update(req, res) {
    const name = req.body.name;
    const id = req.params.id;
    return query
      .update(id, { name: name })
      .then((social) => res.status(OK).send({ error: false, data: social }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  findAll(req, res) {
    return query
      .findAll()
      .then((social) => res.status(OK).send({ error: false, data: social }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },
};
