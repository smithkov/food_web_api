const SocialType = require("../models").SocialType;
const Query = new require("../queries/crud");
const validate = require("../validations/validation");
const { SERVER_ERROR, OK, VALIDATION_ERROR } = require("../errors/statusCode");
const query = new Query(SocialType);

module.exports = {
  create(req, res) {
    const { name, icon } = req.body;

    const { error, value } = validate.nameSchema({ name });

    if (!error) {
      return query
        .add({ name, icon })
        .then((socialType) => res.status(OK).send(socialType))
        .catch((error) => res.status(SERVER_ERROR).send(error));
    } else {
      return res.status(VALIDATION_ERROR).send({ message: error, error: true });
    }
  },
  delete(req, res) {
    const id = req.params.id;
    return query
      .delete(id)
      .then((socialType) => res.status(OK).send({ error: false, data: id }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  findPk(req, res) {
    const id = req.params.id;
    return query
      .findPK(id)
      .then((socialType) =>
        res.status(OK).send({ error: false, data: socialType })
      )
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  update(req, res) {
    const { name, icon } = req.body;
    const id = req.params.id;
    return query
      .update(id, { name, icon })
      .then((socialType) =>
        res.status(OK).send({ error: false, data: socialType })
      )
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  findAll(req, res) {
    return query
      .findAll()
      .then((socialType) =>
        res.status(OK).send({ error: false, data: socialType })
      )
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },
};
