const Product = require("../models").Product;
const Shop = require("../models").VirtualShop;
const ProductImage = require("../models").ProductImage;
const Query = new require("../queries/crud");
const validate = require("../validations/validation");
const {
  SERVER_ERROR,
  OK,
  VALIDATION_ERROR,
  Messages,
} = require("../errors/statusCode");
const query = new Query(Product);
const imageQuery = new Query(ProductImage);
const shopQuery = new Query(Shop);

module.exports = {
  create: async (req, res) => {
    const {
      name,
      price,
      discountPrice,
      quantity,
      desc,
      weight,
      originId,
      shopId,
      categoryId,
      subCategoryId,
      unitId,
      userId,
    } = req.body;

    const { error, value } = validate.nameSchema({ name: name });

    const shop = await shopQuery.findOne({ userId: userId });

    if (!shop)
      return res
        .status(VALIDATION_ERROR)
        .send({ message: "No shop associated with the user", error: true });

    return query
      .add({
        name,
        price,
        discountPrice,
        quantity,
        desc,
        weight,
        originId,
        shopId: shop.id,
        categoryId,
        subCategoryId,
        originId,
        userId,
        photo: req.file.filename,
        unitId: unitId ? unitId : null,
      })
      .then((product) => {
        res.status(OK).send({
          error: false,
          message: `${product.name} was added successfully.`,
        });
      })
      .catch((error) =>
        res
          .status(SERVER_ERROR)
          .send({ message: Messages.serverError, error: true })
      );
  },
  findByCategory(req, res) {
    const id = req.params.id;
    return query
      .findAllWithParam({ categoryId: id })
      .then((product) => res.status(OK).send({ error: false, data: product }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },
  findByUser(req, res) {
    const userId = req.body.userId;
    const shop = shopQuery.findOne({ userId: userId });
    if (!shop)
      return res
        .status(VALIDATION_ERROR)
        .send({ message: "No product associated with this shop", error: true });

    return query
      .findAllWithParam({ userId: userId })
      .then((product) => res.status(OK).send({ error: false, data: product }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },
  findByShop(req, res) {
    const shopId = req.params.id;

    return query
      .findAllWithParam({ shopId: shopId })
      .then((product) => res.status(OK).send({ error: false, data: product }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },
  findByOrigin(req, res) {
    const id = req.params.id;
    return query
      .findAllWithParam({ originId: id })
      .then((product) => res.status(OK).send({ error: false, data: product }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },
  delete(req, res) {
    const id = req.params.id;
    return query
      .delete(id)
      .then((product) => res.status(OK).send({ error: false, data: id }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  findPk(req, res) {
    const id = req.params.id;
    return query
      .findPK(id)
      .then((product) => res.status(OK).send({ error: false, data: product }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  update:async(req, res)=> {
    const {
      name,
      price,
      discountPrice,
      quantity,
      desc,
      weight,
      originId,
      categoryId,
      unitId,
      userId,
      photo
    } = req.body;
    const id = req.params.id;
    const mealPhoto = req.file?req.file.filename:photo;
    return query
      .update(id, {
        name,
        price,
        discountPrice,
        quantity,
        desc,
        weight,
        originId,
        categoryId,
        originId,
        userId,
        photo: mealPhoto,
        unitId: unitId ? unitId : null,
      })
      .then((product) => res.status(OK).send({ error: false, data: product }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },
  
    frontPageMeal(req, res) {
      return query
        .findAllLimit(5)
        .then((product) => res.status(OK).send({ error: false, data: product }));
      //.catch((error) => res.status(SERVER_ERROR).send(error));
      // return query
      //   .findAll()
      //   .then((product) => res.status(OK).send({ error: false, data: product }))
      //   .catch((error) => res.status(SERVER_ERROR).send(error));
    },
  findAll(req, res) {
    return query
      .findAll()
      .then((product) => res.status(OK).send({ error: false, data: product }));
    //.catch((error) => res.status(SERVER_ERROR).send(error));
    // return query
    //   .findAll()
    //   .then((product) => res.status(OK).send({ error: false, data: product }))
    //   .catch((error) => res.status(SERVER_ERROR).send(error));
  },
};
