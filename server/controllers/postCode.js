const PostCode = require("../models").PostCode;
const Query = new require("../queries/crud");
const validate = require("../validations/validation");
const {
  SERVER_ERROR,
  OK,
  VALIDATION_ERROR,
  Messages,
} = require("../errors/statusCode");
const query = new Query(PostCode);

module.exports = {
  create: async (req, res) => {
    try {
      const { code, shopId } = req.body;
      const hasDuplicate = await query.findOne({ code, shopId });
      if (!hasDuplicate) {
        const postCode = await query.add({ code, shopId });
        return res.status(OK).send({ error: false, data:postCode });
      } else {
        return res.status(OK).send({ error: true });
      }
    } catch (err) {
      return res
        .status(OK)
        .send({ error: true });
    }
  },
  delete(req, res) {
    const id = req.params.id;
    return query
      .delete(id)
      .then((postCodes) => res.status(OK).send({ error: false, data: id }))
      .catch((error) => res.status(OK).send({error:true}));
  },

  findByShop(req, res) {
    const shopId = req.body.shopId;
    return query
      .findAllWithParam({ shopId })
      .then((postCodes) =>
        res.status(OK).send({ error: false, data: postCodes })
      )
      .catch((error) => res.status(SERVER_ERROR).send({ error: true }));
  },

  update(req, res) {
    const name = req.body.name;
    const id = req.params.id;
    return query
      .update(id, { name: name })
      .then((postCodes) =>
        res.status(OK).send({ error: false, data: postCodes })
      )
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  findAll(req, res) {
    return query
      .findAll({
        model: Shop,
        as: "VirtualShop",
        required: true,
        include: [{ model: OpeningDay, as: "openingTimes", required: true }],
      })
      .then((postCodes) =>
        res.status(OK).send({ error: false, data: postCodes })
      )
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },
};
