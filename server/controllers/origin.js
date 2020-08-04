const Origin = require("../models").Origin;
const Query = new require("../queries/crud");
const validate = require("../validations/validation");
const { SERVER_ERROR, OK, VALIDATION_ERROR } = require("../errors/statusCode");
const query = new Query(Origin);
const Shop = require("../models").VirtualShop;
const OpeningDay = require("../models").OpeningDay;

module.exports = {
  create(req, res) {
    const name = req.body.name;

    const { error, value } = validate.nameSchema({ name: name });

    if (!error) {
      return query
        .add({ name: name })
        .then((origin) => res.status(OK).send(origin))
        .catch((error) => res.status(SERVER_ERROR).send(error));
    } else {
      return res.status(VALIDATION_ERROR).send({ message: error, error: true });
    }
  },
  delete(req, res) {
    const id = req.params.id;
    return query
      .delete(id)
      .then((origin) => res.status(OK).send({ error: false, data: id }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  findPk(req, res) {
    const id = req.params.id;
    return query
      .findPK(id)
      .then((origin) => res.status(OK).send({ error: false, data: origin }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  update(req, res) {
    const name = req.body.name;
    const id = req.params.id;
    return query
      .update(id, { name: name })
      .then((origin) => res.status(OK).send({ error: false, data: origin }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  findAll(req, res) {
    return query
      .findAll({
        model: Shop,
        as: "VirtualShop",
        required: true,
        include: [{ model: OpeningDay, as: "openingTimes", required: true }],
      })
      .then((origin) => res.status(OK).send({ error: false, data: origin }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },
};
