const ProductRating = require("../models").ProductRating;
const Shop = require("../models").VirtualShop;
const User = require("../models").User;
const RS = require("../models").ProductRatingResponse;
const model = require("../models");
const Query = new require("../queries/crud");
const validate = require("../validations/validation");
const {
  SERVER_ERROR,
  OK,
  VALIDATION_ERROR,
  Messages,
} = require("../errors/statusCode");
const { serverError, ratingSuccess, updateSuccess } = Messages;
const query = new Query(ProductRating);

module.exports = {
  create(req, res) {
    const { title, rating, content, userId, shopId, productId } = req.body;

    return query
      .add({ title, rating, userId, shopId, content, productId })
      .then((rating) =>
        res.status(OK).send({ data: rating, message: ratingSuccess })
      )
      .catch((error) =>
        res.status(SERVER_ERROR).send({ error: true, message: serverError })
      );
  },
  delete(req, res) {
    const id = req.params.id;
    return query
      .delete(id)
      .then((rating) => res.status(OK).send({ error: false, data: id }))
      .catch((error) =>
        res.status(SERVER_ERROR).send({ error: true, message: serverError })
      );
  },

  findPk(req, res) {
    const id = req.params.id;
    return query
      .findPK(id)
      .then((rating) => res.status(OK).send({ error: false, data: rating }))
      .catch((error) =>
        res.status(SERVER_ERROR).send({ error: true, message: serverError })
      );
  },

  findByProduct: async (req, res) => {
    const productId = req.body.productId;

    const rating = await ProductRating.findAll({
      where: { productId },
      include: [
        {
          model: RS,
          as: "ratingResponses",
          include: [
            { model: User, as: "User" },
            { model: Shop, as: "VirtualShop" },
          ],
        },
        { model: User, as: "User" },
        { model: Shop, as: "VirtualShop" },
      ],
      order: [["createdAt", "DESC"]],
    });
    return res.status(OK).send({ error: false, data: rating });
    // .catch((error) => {
    //   res.status(SERVER_ERROR).send({ error: true, message: serverError });
    // });
  },

  findByShop: async (req, res) => {
    const shopId = req.body.shopId;

    const rating = await ProductRating.findAll({
      where: { shopId },
      include: [
        {
          model: RS,
          as: "ratingResponses",
          include: [
            { model: User, as: "User" },
            { model: Shop, as: "VirtualShop" },
          ],
        },
        { model: User, as: "User" },
        { model: Shop, as: "VirtualShop" },
      ],
      order: [["createdAt", "DESC"]],
    });

    return res.status(OK).send({ error: false, data: rating });
    // .catch((error) => {
    //   res.status(SERVER_ERROR).send({ error: true, message: serverError });
    // });
  },

  update(req, res) {
    const { title, rating, userId, shopId, content } = req.body;
    const id = req.params.id;
    return query
      .update(id, { title, rating, userId, shopId, content })
      .then((rating) =>
        res
          .status(OK)
          .send({ error: false, message: updateSuccess, data: rating })
      )
      .catch((error) =>
        res.status(SERVER_ERROR).send({ error: true, message: serverError })
      );
  },

  findAll(req, res) {
    return query
      .findAll()
      .then((rating) => res.status(OK).send({ error: false, data: rating }))
      .catch((error) =>
        res.status(SERVER_ERROR).send({ error: true, message: serverError })
      );
  },
};
