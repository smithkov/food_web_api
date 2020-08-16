const Transaction = require("../models").Transaction;
const SoldProduct = require("../models").SoldProduct;
const User = require("../models").User;
const Shop = require("../models").VirtualShop;
const TempOrder = require("../models").Order;
const model = require("../models");
const Query = new require("../queries/crud");
const validate = require("../validations/validation");
const { SERVER_ERROR, OK, VALIDATION_ERROR } = require("../errors/statusCode");
const query = new Query(Transaction);
const querySold = new Query(SoldProduct);
const queryOrder = new Query(TempOrder);
const stripe = require("stripe")(process.env.STRIPE);
const twilio = require("twilio");
const accountSid = process.env.TWILIOSID; // Your Account SID from www.twilio.com/console
const authToken = process.env.TWILIOTOKEN; // Your Auth Token from www.twilio.com/console
const client = new twilio(accountSid, authToken);
const { v4: uuidv4 } = require("uuid");

module.exports = {
  create: async (req, res) => {
    let createTransaction;
    const { tempId, shopId, paymentId, paymentEmail } = req.body;
    const findOrder = await queryOrder.findOne({ tempId, shopId });
    if (findOrder) {
      const {
        total,
        deliveryPrice,
        subTotal,
        offerDiscount,
        orders,
        message,
      } = findOrder;
      const t = await model.sequelize.transaction();
      try {
        createTransaction = await query.addTransact(
          {
            total,
            refNo: tempId,
            shopId,
            userId: req.userData.id,
            deliveryPrice,
            subTotal,
            offerDiscount,
            paymentEmail,
            paymentId,
            message,
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

        const shop = await Shop.findByPk(shopId, {
          include: [{ model: User, as: "User", required: true }],
        });
        const shopName = shop ? shop.shopName : "";
        const shopUser = shop.User;
        const phone = shop ? shop.phone : "";
        const msg = await client.messages.create(
          {
            body: `Hello ${shopName}, Congrats, you have a pending food order on Foodengo. Kindly login to your seller dashboard to fulfil order.`,
            to: `${phone}`,
            from: "Foodengo",
          },
          async function (err, responseData) {
            if (!err) {
              const deleteOrder = await queryOrder.delete(findOrder.id);
              res
                .status(OK)
                .send({ error: false, message: "Payment successfully made" });
            } else {
              const deleteOrder = await queryOrder.delete(findOrder.id);
              res
                .status(OK)
                .send({ error: false, message: "Payment successfully made" });
            }
          }
        );
      } catch (err) {
        await t.rollback();
        res.status(OK).send({ error: true });
      }
    } else {
      res.status(OK).send({
        error: true,
        message: "There is no order associated with supplied details.",
      });
    }
  },
  createStripePayment(req, res) {
    try {
      const { product, token } = req.body;

      const idempotencyKey = uuidv4();
      return stripe.customers
        .create({
          email: token.email,
          source: token.id,
        })
        .then((customer) => {
          stripe.charges.create(
            {
              amount: product.amount * 100,
              currency: "gbp",
              customer: customer.id,
              receipt_email: token.email,
              description: product.desc,
            },
            { idempotencyKey },
            function (err, charge) {
              if (err) {
                return res.status(OK).send({ error: true });
              } else {
                return res.status(OK).send({ error: false });
              }
            }
          );
        })
        .catch((err) => {
          return res.status(OK).send({ error: true });
        });
    } catch (err) {
      return res.status(OK).send({ error: true });
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
      .findAllWithParam({ userId })
      .then((transaction) =>
        res.status(OK).send({ error: false, data: transaction })
      )
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  findTransactionByShop: async (req, res) => {
    try {
      const shopId = req.body.shopId;
      const transaction = await Transaction.findAll({
        where: { shopId },
        include: [{ all: true }],
        order: [["createdAt", "DESC"]],
      });

      return res.status(OK).send({ error: false, data: transaction });
    } catch (err) {
      return res.status(OK).send({ error: true });
    }
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
