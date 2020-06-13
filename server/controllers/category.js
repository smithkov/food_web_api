const Category = require("../models").Category;
const VirtualShop = require("../models").VirtualShop;
const Query = new require("../queries/crud");
const validate = require("../validations/validation");
const { SERVER_ERROR, OK, VALIDATION_ERROR } = require("../errors/statusCode");
const query = new Query(Category);
const shopQuery = new Query(VirtualShop);

module.exports = {
  create(req, res) {
    const { name, shopTypeId } = req.body;
    console.log(name);

    const { error, value } = validate.nameSchema({ name: name });

    if (!error) {
      return query
        .add({ name: name, shopTypeId: shopTypeId })
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
  findByShopType: async (req, res) => {
    try {
      const userId = req.params.id;
      const shop = await shopQuery.findOne({ userId: userId });
      if (!shopQuery) {
        return res
          .status(SERVER_ERROR)
          .send({ error: true, message: "No shop associated with the user" });
      }

      const categoryByShopType = await query.findAllWithParam({
        shopTypeId: shop.shopTypeId,
      });
      return res.status(OK).send({ error: false, data: categoryByShopType });
    } catch (err) {}
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
      .findAll()
      .then((category) => res.status(OK).send({ error: false, data: category }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },
};
