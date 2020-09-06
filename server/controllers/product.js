const Product = require("../models").Product;
const opening = require("../models").OpeningDay;
const Shop = require("../models").VirtualShop;
const OpeningDay = require("../models").OpeningDay;
const Origin = require("../models").Origin;
const ProductImage = require("../models").ProductImage;
const ProductRating = require("../models").ProductRating;
const Query = new require("../queries/crud");
const validate = require("../validations/validation");
const Mail = require("../utility/mail");
const Op = require("sequelize").Op;
const moment = require("moment");
const {
  SERVER_ERROR,
  OK,
  VALIDATION_ERROR,
  Messages,
} = require("../errors/statusCode");
const query = new Query(Product);

const imageQuery = new Query(ProductImage);
const shopQuery = new Query(Shop);
const openQuery = new Query(OpeningDay);
const firstHour = "00:00";
const lastHour = "23:59";
const myDate = new Date();
const curTime = moment(myDate).format("HH:mm");
const getDay = myDate.getDay();

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
      categoryId,
      ingredients,
      subCategoryId,
      unitId,
      shopId,
    } = req.body;

    return query
      .add({
        name,
        price,
        discountPrice,
        quantity,
        desc,
        weight,
        originId,
        categoryId,
        subCategoryId,
        originId,
        ingredients: JSON.parse(ingredients),
        shopId,
        photo: req.file.location,
        unitId: unitId ? unitId : null,
      })
      .then((product) => {
        res.status(OK).send({
          error: false,
          message: `${product.name} was added successfully.`,
        });
      });
    // .catch((error) =>
    //   res
    //     .status(SERVER_ERROR)
    //     .send({ message: Messages.serverError, error: true })
    // );
  },
 
  findByUser: async (req, res) => {
    const userId = req.body.userId;

    const shop = await shopQuery.findOne({ userId: userId });

    if (!shop)
      return res
        .status(VALIDATION_ERROR)
        .send({ message: "No product associated with this shop", error: true });

    const product = await query.findAllWithParam({ userId: userId });

    return res.status(OK).send({ error: false, data: product });
    //.catch((error) => res.status(SERVER_ERROR).send({error:true});
  },
  findByShop: async (req, res) => {
    const shopId = req.params.id;
    const product = await query.findAllWithParam({ shopId: shopId });

    return res.status(OK).send({ error: false, data: product });
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

  update: async (req, res) => {
    const {
      name,
      price,
      discountPrice,
      quantity,
      desc,
      weight,
      originId,
      categoryId,
      ingredients,
      unitId,
      photo,
    } = req.body;
    const id = req.params.id;
    const mealPhoto = req.file ? req.file.location : photo;
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
        ingredients: JSON.parse(ingredients),
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
  },
 
};
