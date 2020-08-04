const Category = require("../models").Category;
const model = require("../models");
const VirtualShop = require("../models").VirtualShop;
const Product = require("../models").Products;
const Query = new require("../queries/crud");
const validate = require("../validations/validation");
const { SERVER_ERROR, OK, VALIDATION_ERROR } = require("../errors/statusCode");
const query = new Query(Category);
const OpeningDay = require("../models").OpeningDay;
const shopQuery = new Query(VirtualShop);

module.exports = {
  create(req, res) {
    const { name } = req.body;

    const { error, value } = validate.nameSchema({ name: name });

    if (!error) {
      return query
        .add({ name: name })
        .then((category) => res.status(OK).send(category))
        .catch((error) => res.status(SERVER_ERROR).send(error));
    } else {
      return res.status(VALIDATION_ERROR).send({ message: error, error: true });
    }
  },
  delete(req, res) {
    const id = req.params.id;
    return query
      .delete(id)
      .then((category) => res.status(OK).send({ error: false, data: id }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  findPk(req, res) {
    const id = req.params.id;
    return query
      .findPK(id)
      .then((category) => res.status(OK).send({ error: false, data: category }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  update(req, res) {
    const name = req.body.name;
    const id = req.params.id;
    return query
      .update(id, { name: name })
      .then((category) => res.status(OK).send({ error: false, data: category }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  findAll(req, res) {
    return query
      .findAll({
        include: [
          {
            model: Product,
            as: "products",
            required: true,
            include: [
              {
                model: VirtualShop,
                as: "VirtualShop",
                required: true,
                include: [
                  { model: OpeningDay, as: "openingTimes", required: true },
                ],
              },
            ],
          },
        ],
      })
      .then((category) =>
        res.status(OK).send({ error: false, data: category })
      );
  },
};
