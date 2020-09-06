const SubCategory = require("../models").SubCategory;
const model = require("../models");
const Query = new require("../queries/crud");
const validate = require("../validations/validation");

const {
  SERVER_ERROR,
  OK,
  VALIDATION_ERROR,
  Messages,
} = require("../errors/statusCode");
const query = new Query(SubCategory);

module.exports = {
  create(req, res) {
    try {
      const { name, categoryId } = req.body;

      const { error, value } = validate.nameSchema({ name: name });
      console.log(req.file);
      // model.sequelize.transaction

      if (!error) {
        return query
          .add({
            name: name,
            categoryId: categoryId,
            imagePath: req.file.location,
          })
          .then((subCategory) => res.status(OK).send(subCategory))
          .catch((error) => res.status(SERVER_ERROR).send(error));
      } else {
        return res
          .status(VALIDATION_ERROR)
          .send({ message: error, error: true });
      }
    } catch (err) {
      console.log(err);
      return res
        .status(SERVER_ERROR)
        .send({ message: Messages.serverError, error: true });
    }
  },
  
  delete(req, res) {
    const id = req.params.id;
    return query
      .delete(id)
      .then((subCategory) => res.status(OK).send({ error: false, data: id }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  findPk(req, res) {
    const id = req.params.id;
    return query
      .findPK(id)
      .then((subCategory) =>
        res.status(OK).send({ error: false, data: subCategory })
      )
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  update(req, res) {
    const name = req.body.name;
    const id = req.params.id;
    return query
      .update(id, { name: name })
      .then((subCategory) =>
        res.status(OK).send({ error: false, data: subCategory })
      )
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  findAll(req, res) {
    return query
      .findAll()
      .then((subCategory) =>
        res.status(OK).send({ error: false, data: subCategory })
      )
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },
};
