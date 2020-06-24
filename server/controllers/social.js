const Social = require("../models").Social;
const Shop = require("../models").VirtualShop;
const Query = new require("../queries/crud");
const validate = require("../validations/validation");
const {
  SERVER_ERROR,
  OK,
  VALIDATION_ERROR,
  Messages,
} = require("../errors/statusCode");
const { serverError, savedSuccess, updateSuccess } = Messages;
const query = new Query(Social);
const shopQuery = new Query(Shop);

module.exports = {
  create: async (req, res) => {
    const { id, userId, facebook, instagram, twitter } = req.body;

    const shop = await shopQuery.findOne({ userId });

    if (shop) {
      if (!id) {
        const social = await query.add({
          facebook,
          instagram,
          twitter,
          shopId: shop.id,
        });
        return res.status(OK).send({ data: social, message: savedSuccess });
      } else {
        const update = await query.update(id, { facebook, instagram, twitter });
        return res.status(OK).send({ data: update, message: savedSuccess });
      }
    } else res.status(SERVER_ERROR).send({ error: true, message: serverError });
  },
  delete(req, res) {
    const id = req.params.id;
    return query
      .delete(id)
      .then((social) => res.status(OK).send({ error: false, data: id }))
      .catch((error) =>
        res.status(SERVER_ERROR).send({ error: true, message: serverError })
      );
  },

  findPk: async (req, res) => {
    try {
      const userId = req.params.id;
      const shop = await shopQuery.findOne({ userId });
      if (shop) {
        const social = await query.findOne({ shopId: shop.id });
        return res.status(OK).send({ error: false, data: social });
      } else
        res.status(SERVER_ERROR).send({ error: true, message: serverError });
    } catch (err) {
      res.status(SERVER_ERROR).send({ error: true, message: serverError });
    }
  },

  update(req, res) {
    const name = req.body.name;
    const id = req.params.id;
    return query
      .update(id, { name: name })
      .then((social) =>
        res
          .status(OK)
          .send({ error: false, message: updateSuccess, data: social })
      )
      .catch((error) =>
        res.status(SERVER_ERROR).send({ error: true, message: serverError })
      );
  },

  findAll(req, res) {
    return query
      .findAll()
      .then((social) => res.status(OK).send({ error: false, data: social }))
      .catch((error) =>
        res.status(SERVER_ERROR).send({ error: true, message: serverError })
      );
  },
};
