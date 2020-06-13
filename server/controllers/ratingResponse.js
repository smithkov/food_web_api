const RatingResponse = require("../models").RatingResponse;
const Query = new require("../queries/crud");
const validate = require("../validations/validation");
const {
  SERVER_ERROR,
  OK,
  VALIDATION_ERROR,
  Messages,
} = require("../errors/statusCode");
const { serverError, savedSuccess, updateSuccess } = Messages;
const query = new Query(RatingResponse);

module.exports = {
  create(req, res) {
    const { content, ratingId, userId } = req.body;

    return query
      .add({ content, ratingId, userId })
      .then((ratingResponse) =>
        res.status(OK).send({ data: ratingResponse, message: savedSuccess })
      )
      .catch((error) =>
        res.status(SERVER_ERROR).send({ error: true, message: serverError })
      );
  },
  delete(req, res) {
    const id = req.params.id;
    return query
      .delete(id)
      .then((ratingResponse) => res.status(OK).send({ error: false, data: id }))
      .catch((error) =>
        res.status(SERVER_ERROR).send({ error: true, message: serverError })
      );
  },

  findPk(req, res) {
    const id = req.params.id;
    return query
      .findPK(id)
      .then((ratingResponse) =>
        res.status(OK).send({ error: false, data: ratingResponse })
      )
      .catch((error) =>
        res.status(SERVER_ERROR).send({ error: true, message: serverError })
      );
  },

  update(req, res) {
    const { content, ratingId, userId } = req.body;
    const id = req.params.id;
    return query
      .update(id, { content, ratingId, userId })
      .then((ratingResponse) =>
        res
          .status(OK)
          .send({ error: false, message: updateSuccess, data: ratingResponse })
      )
      .catch((error) =>
        res.status(SERVER_ERROR).send({ error: true, message: serverError })
      );
  },

  findAll(req, res) {
    return query
      .findAll()
      .then((ratingResponse) =>
        res.status(OK).send({ error: false, data: ratingResponse })
      )
      .catch((error) =>
        res.status(SERVER_ERROR).send({ error: true, message: serverError })
      );
  },
};
