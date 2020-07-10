const SoldProduct = require("../models").SoldProduct;
const Query = new require("../queries/crud");
const validate = require("../validations/validation");
const { SERVER_ERROR, OK, VALIDATION_ERROR } = require("../errors/statusCode");
const query = new Query(SoldProduct);

module.exports = {
  delete(req, res) {
    const id = req.params.id;
    return query
      .delete(id)
      .then((sales) => res.status(OK).send({ error: false, data: id }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  findPk(req, res) {
    const id = req.params.id;
    return query
      .findPK(id)
      .then((sales) => res.status(OK).send({ error: false, data: sales }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  update(req, res) {
    const name = req.body.name;
    const id = req.params.id;
    return query
      .update(id, { name: name })
      .then((sales) => res.status(OK).send({ error: false, data: sales }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  findAllByShop(req, res) {
    const shopId = req.body.shopId;
    return query
      .findAllWithParam({ shopId })
      .then((sales) => res.status(OK).send({ error: false, data: sales }))
  },
};
