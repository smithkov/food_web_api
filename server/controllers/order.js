const Order = require("../models").Order;
const Query = new require("../queries/crud");
const validate = require("../validations/validation");
const { SERVER_ERROR, OK, NOT_FOUND } = require("../errors/statusCode");
const query = new Query(Order);

module.exports = {
  create: async (req, res) => {
    const {
      total,
      subTotal,
      tempId,
      shopId,
      orders,
      offerDiscount,
      deliveryPrice,
    } = req.body;
    const findOrder = await query.findOne({ tempId, shopId });
    if (findOrder) {
      return query
        .update(findOrder.id, {
          total,
          subTotal,
          tempId,
          shopId,
          orders,
          offerDiscount,
          deliveryPrice,
        })
        .then((order) => res.status(OK).send(order))
        .catch((error) => res.status(SERVER_ERROR).send(error));
    } else {
      return query
        .add({
          total,
          subTotal,
          tempId,
          shopId,
          orders,
          offerDiscount,
          deliveryPrice,
        })
        .then((order) => res.status(OK).send(order))
        .catch((error) => res.status(SERVER_ERROR).send(error));
    }
  },
  delete(req, res) {
    const id = req.params.id;
    return query
      .delete(id)
      .then((order) => res.status(OK).send({ error: false, data: id }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  findPk(req, res) {
    const id = req.params.id;
    return query
      .findPK(id)
      .then((order) => res.status(OK).send({ error: false, data: order }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  updateMessage: async (req, res) => {
    const { message, tempId, shopId } = req.body;

    const findOrder = await query.findOne({ tempId, shopId });
    if (!findOrder)
      return res.status(NOT_FOUND).send({
        error: true,
        message: "There is no order associated with supplied details.",
      });
    if (message) {
      const update = await query.update(findOrder.id, { message });
    }
    return res.status(OK).send({ error: false, data: null });
  },

  findByTempId(req, res) {
    const { tempId, shopId } = req.body;

    return query
      .findOne({ tempId, shopId })
      .then((order) => res.status(OK).send({ error: false, data: order }));
  },
  findByShopId(req, res) {
    const shopId = req.params.shopId;
    return query
      .findOne({ shopId })
      .then((order) => res.status(OK).send({ error: false, data: order }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },
};
