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
const openArray = [
  {
    model: OpeningDay,
    as: "openingTimes",
    where: {
      oTime: {
        [Op.between]: [firstHour, curTime],
      },
      cTime: {
        [Op.lte]: lastHour,
      },
      dayNum: getDay,
      checked: true,
    },
  },
];
const closeArray = [
  {
    model: OpeningDay,
    as: "openingTimes",
    where: {
      [Op.or]: [
        {
          dayNum: {
            [Op.and]: [{ [Op.ne]: getDay }, { [Op.ne]: -1 }],
          },
          checked: true,
        },
        {
          oTime: {
            [Op.gt]: curTime,
          },
          cTime: {
            [Op.lte]: lastHour,
          },
          dayNum: getDay,
          checked: true,
        },
      ],
    },
  },
];

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
        photo: req.file.filename,
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
  findByCategory: async (req, res) => {
    const id = req.params.id;
    try {
      const openProduct = await Product.findAll({
        where: { categoryId: id },
        include: [
          {
            model: ProductRating,
            as: "productRatings",
            required: false,
          },
          {
            model: Shop,
            as: "VirtualShop",
            required: true,
            include: openArray,
          },
        ],
        order: [["createdAt", "DESC"]],
      });

      const closeProduct = await Product.findAll({
        where: { categoryId: id },
        include: [
          {
            model: ProductRating,
            as: "productRatings",
            required: false,
          },
          {
            model: Shop,
            as: "VirtualShop",
            required: true,
            include: closeArray,
          },
        ],
        order: [["createdAt", "DESC"]],
      });

      return res
        .status(OK)
        .send({ error: false, open: openProduct, close: closeProduct });
    } catch (err) {
      return res.status(SERVER_ERROR).send({ error: true });
    }
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
  findByOrigin: async (req, res) => {
    const id = req.params.id;
    try {
      const openProduct = await Product.findAll({
        where: { originId: id },
        include: [
          {
            model: ProductRating,
            as: "productRatings",
            required: false,
          },
          {
            model: Origin,
            as: "Origin",
            required: true,
            where: { id: id },
          },
          {
            model: Shop,
            as: "VirtualShop",
            required: true,
            include: openArray,
          },
        ],
        order: [["createdAt", "DESC"]],
      });

      const closeProduct = await Product.findAll({
        include: [
          {
            model: ProductRating,
            as: "productRatings",
            required: false,
          },
          {
            model: Origin,
            as: "Origin",
            required: true,
            where: { id: id },
          },
          {
            model: Shop,
            as: "VirtualShop",
            required: true,
            include: closeArray,
          },
        ],
        order: [["createdAt", "DESC"]],
      });
      return res
        .status(OK)
        .send({ error: false, open: openProduct, close: closeProduct });
    } catch (err) {
      return res.status(SERVER_ERROR).send({ error: true });
    }
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
    const mealPhoto = req.file ? req.file.filename : photo;
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
  findAllOpen: async (req, res) => {
    const search = req.body.search;
    const hasVals = search != "";

    //Begining of available products
    const product = hasVals
      ? await Product.findAll({
          where: {
            [Op.or]: [
              { name: { [Op.like]: `%${search}%` } },
              { desc: { [Op.like]: `%${search}%` } },
            ],
          },
          include: [
            {
              model: ProductRating,
              as: "productRatings",
              required: true,
            },
            {
              model: Shop,
              as: "VirtualShop",
              required: true,
              include: openArray,
            },
          ],
          order: [["createdAt", "DESC"]],
        })
      : await Product.findAll({
          include: [
            {
              model: ProductRating,
              as: "productRatings",
              required: false,
            },
            {
              model: Shop,
              as: "VirtualShop",
              required: true,
              include: openArray,
            },
          ],
          order: [["createdAt", "DESC"]],
        });
    //End of available products

    //Begining of products not available
    const notAvailableProducts = hasVals
      ? await Product.findAll({
          where: {
            [Op.or]: [
              { name: { [Op.like]: `%${search}%` } },
              { desc: { [Op.like]: `%${search}%` } },
            ],
          },
          include: [
            {
              model: ProductRating,
              as: "productRatings",
              required: false,
            },
            {
              model: Shop,
              as: "VirtualShop",
              required: true,
              include: closeArray,
            },
          ],
          order: [["createdAt", "DESC"]],
        })
      : await Product.findAll({
          include: [
            {
              model: ProductRating,
              as: "productRatings",
              required: false,
            },
            {
              model: Shop,
              as: "VirtualShop",
              required: true,
              include: closeArray,
            },
          ],
          order: [["createdAt", "DESC"]],
        });

    //End of available products

    return res
      .status(OK)
      .send({ error: false, open: product, close: notAvailableProducts });
    //.catch((error) => res.status(SERVER_ERROR).send(error));
    // return query
    //   .findAll()
    //   .then((product) => res.status(OK).send({ error: false, data: product }))
    //   .catch((error) => res.status(SERVER_ERROR).send(error));
  },
};
