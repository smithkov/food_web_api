const Transaction = require("../models").Transaction;
const SoldProduct = require("../models").SoldProduct;
const TempOrder = require("../models").Order;
const model = require("../models");
const Query = new require("../queries/crud");
const validate = require("../validations/validation");
const { SERVER_ERROR, OK, VALIDATION_ERROR } = require("../errors/statusCode");
const query = new Query(Transaction);
const querySold = new Query(SoldProduct);
const queryOrder = new Query(TempOrder);

module.exports = {
  create: async (req, res) => {
    let createTransaction;
    const { tempId, shopId } = req.body;
    const findOrder = await queryOrder.findOne({ tempId, shopId });
    if (findOrder) {
      const {
        total,
        deliveryPrice,
        subTotal,
        offerDiscount,
        orders,
        message
      } = findOrder;
      const t = await model.sequelize.transaction();
      try {
        createTransaction = await query.addTransact(
          {
            total,
            refNo: tempId,
            shopId,
            userId:req.userData.id,
            deliveryPrice,
            subTotal,
            offerDiscount,
            message
          },
          t
        );
        const transactionId = createTransaction.id;
        for (let item of orders) {
          const { name, quantity, price, id } = item;
          const createTransaction = await querySold.addTransact(
            {
              quantity,
              price,
              total: quantity * price,
              name,
              transactionId,
            },
            t
          );
        }
        await t.commit();
        const deleteOrder = await queryOrder.delete(findOrder.id);
        res
          .status(OK)
          .send({ error: false, message: "Payment successfully made" });
      } catch (err) {
        await t.rollback();
      }
    } else {
      res.status(OK).send({
        error: true,
        message: "There is no order associated with supplied details.",
      });
    }
  },
  delete(req, res) {
    const id = req.params.id;
    return query
      .delete(id)
      .then((transaction) => res.status(OK).send({ error: false, data: id }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  findPk(req, res) {
    const id = req.params.id;
    return query
      .findPK(id)
      .then((transaction) =>
        res.status(OK).send({ error: false, data: transaction })
      )
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  findTransactionByUser(req, res) {
    const userId = req.body.userId;
    return query
      .findAllWithParam({userId})
      .then((transaction) =>
        res.status(OK).send({ error: false, data: transaction })
      )
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  findTransactionByShop(req, res) {
    const shopId = req.body.shopId;
    return query
      .findAllWithParam({shopId})
      .then((transaction) =>
        res.status(OK).send({ error: false, data: transaction })
      )
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  update(req, res) {
    const name = req.body.name;
    const id = req.params.id;
    return query
      .update(id, { name: name })
      .then((transaction) =>
        res.status(OK).send({ error: false, data: transaction })
      )
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  findAll(req, res) {
    return query
      .findAll()
      .then((transaction) =>
        res.status(OK).send({ error: false, data: transaction })
      )
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },
};
