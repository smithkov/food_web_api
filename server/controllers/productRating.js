const ProductRating = require("../models").ProductRating;
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
    const { title, rating, content,userId, shopId, productId } = req.body;
    
    
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

  findByProduct(req, res) {
    const productId = req.body.productId;
    
    return query
      .findAllWithParam({productId})
      .then((rating) => res.status(OK).send({ error: false, data: rating }))
      .catch((error) =>{
        res.status(SERVER_ERROR).send({ error: true, message: serverError })}
      );
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
