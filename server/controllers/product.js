const Product = require("../models").Product;
const Query = new require("../queries/crud");
const validate = require("../validations/validation");
const { SERVER_ERROR, OK, VALIDATION_ERROR } = require("../errors/statusCode");
const query = new Query(Product);

module.exports = {
  create(req, res) {
    const {name, price, discountPrice,quantity, desc, weight, rating} = req.body;

    const { error, value } = validate.nameSchema({ name: name });

    if (!error) {
      return query
        .add({ name, price,discountPrice,quantity,dec, weight, rating })
        .then((product) => res.status(OK).send(product))
        .catch((error) => res.status(SERVER_ERROR).send(error));
    } else {
      return res.status(VALIDATION_ERROR).send({ message: error, error: true });
    }
  },
  delete(req, res) {
    const id = req.params.id;
    return query
      .delete(id)
      .then((product) => res.status(OK).send({ error: false, data: id }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  findPk(req, res) {
    const id = req.params.id;
    return query
      .findPK(id)
      .then((product) => res.status(OK).send({ error: false, data: product }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  update(req, res) {
    const name = req.body.name;
    const id = req.params.id;
    return query
      .update(id, { name: name })
      .then((product) => res.status(OK).send({ error: false, data: product }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  findAll(req, res) {
    return query
      .findAll()
      .then((product) => res.status(OK).send({ error: false, data: product }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },
};
