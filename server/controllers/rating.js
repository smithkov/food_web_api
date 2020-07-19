const Rating = require("../models").Rating;
const Query = new require("../queries/crud");
const validate = require("../validations/validation");
const RS = require("../models").RatingResponse;
const User = require("../models").User;
const Shop = require("../models").VirtualShop;
const {
  SERVER_ERROR,
  OK,
  VALIDATION_ERROR,
  Messages,
} = require("../errors/statusCode");
const { serverError, ratingSuccess, updateSuccess } = Messages;
const query = new Query(Rating);

module.exports = {
  create(req, res) {
    const { title, rating, content, userId, shopId } = req.body;

    return query
      .add({ title, rating, userId, shopId, content })
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

  findByShop: async (req, res) => {
    const shopId = req.body.shopId;
    const rating = await Rating.findAll({
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
    // .catch((error) =>{
    //   res.status(SERVER_ERROR).send({ error: true, message: serverError })}
    // );
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
      .then((rating) => res.status(OK).send({ error: false, data: rating }));
  },
};
