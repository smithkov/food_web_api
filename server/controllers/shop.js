const Shop = require("../models").VirtualShop;
const bcrypt = require("bcryptjs");
const User = require("../models").User;
const Rating = require("../models").Rating;
const model = require("../models");
const Role = require("../models").Role;
const Op = require("sequelize").Op;
const Origin = require("../models").Origin;
const Query = new require("../queries/crud");
const validate = require("../validations/validation");
const Mail = require("../utility/mail");
const { duration } = require("../utility/global");
const {
  SERVER_ERROR,
  OK,
  VALIDATION_ERROR,
  DUPLICATE,
  Messages,
} = require("../errors/statusCode");

const query = new Query(Shop);

const userQuery = new Query(User);
const roleQuery = new Query(Role);

const fs = require("fs");
const { savedSuccess, serverError } = Messages;
rmSpace = (str) => {
  return str.replace(" ", "");
};
module.exports = {
  //this method is basically for store update, after a seller has registered
  create: async (req, res) => {
    const {
      shopName,
      shopId,
      firstAddress,
      secondAddress,
      postCode,
      cityId,
      about,
      shopUrl,
      originId,
    } = req.body;

    try {
      const logoObject = req.files["logo"];
      const bannerObject = req.files["banner"];

      const hasShop = await query.findPK(shopId);

      const logo = logoObject ? logoObject[0].filename : null;
      const banner = bannerObject ? bannerObject[0].filename : null;

      if (hasShop) {
        const shopUri = shopUrl != "" ? rmSpace(shopUrl) : shopName;

        const shopObject = {
          shopName,
          logo: logo ? logo : hasShop.logo,
          banner: banner ? banner : hasShop.banner,
          firstAddress,
          secondAddress,
          about,
          postCode,
          cityId,
          shopUrl: shopUri,
          originId,
        };

        const updateShop = await query.update(hasShop.id, shopObject);

        return res.status(OK).send({
          data: updateShop,
          error: false,
          message: "Saved successfully.",
        });
      }
    } catch (err) {
      res.status(SERVER_ERROR).send({ message: serverError, error: true });
    }
  },
  createShopInfo: async (req, res) => {
    //This method is where a store information is created for the first time when a seller registers.
    const t = await model.sequelize.transaction();
    const {
      shopName,
      firstAddress,
      phone,
      postCode,
      firstName,
      lastName,
      email,
      password,
      cityId,
      originId,
    } = req.body;

    try {
      const rand = Math.floor(111111 + Math.random() * 999999);
      const role = await roleQuery.findOne({ name: "Seller" });
      const currentDate = new Date();
      const date24Hrs = currentDate.setDate(currentDate.getDate() + 1);
      const emailExist = await userQuery.findOne({ email });
      if (!emailExist) {
        bcrypt.hash(password, 10, async (err, hash) => {
          if (err) {
            return res
              .status(SERVER_ERROR)
              .send({ message: serverError, error: true });
          } else {
            const user = await userQuery.addTransact(
              {
                email,
                password: hash,
                firstName,
                lastName,
                roleId: role.id,
                expiry: date24Hrs,
              },
              t
            );
            const createShop = await query.addTransact(
              {
                shopName,
                userId: user.id,
                firstAddress,
                postCode,
                cityId,
                phone,
                shopUrl: shopName,
                originId,
                verificationCode: rand,
              },
              t
            );

            const option = Mail.options(
              user.email,
              user.firstName,
              createShop.shopName
            );
            Mail.send(option);

            const mailOption = Mail.activateOption(user.email, rand);
            Mail.send(mailOption);
            await t.commit();

            return res.status(OK).send({
              error: false,
              id: user.id,
            });
          }
        });
      } else {
        return res
          .status(OK)
          .send({ message: "Email already exist!", error: true });
      }
    } catch (err) {
      console.log(err);
      await t.rollback();
      res.status(SERVER_ERROR).send({ message: serverError, error: true });
    }
  },
  activateAccount: async (req, res) => {
    const verificationCode = req.params.code;

    const shop = await query.findOne({ verificationCode });

    if (shop) {
      await query.update(shop.id, {
        hasEmailVerified: true,
        verificationCode: "",
      });
      return res.status(OK).send({
        message: "Your store account was activated successfully",
        error: false,
      });
    } else {
      return res.status(OK).send({
        message: "The activation link has expired or is invalid.",
        error: true,
      });
    }
  },

  resendVerificationCodeForEmail: async (req, res) => {
    const shopId = req.body.shopId;

    const shop = await query.findPK(shopId);
    const rand = Math.floor(111111 + Math.random() * 999999);

    if (shop) {
      await query.update(shop.id, {
        hasEmailVerified: false,
        verificationCode: rand,
      });

      const mailOption = Mail.activateOption(shop.User.email, rand);
      Mail.send(mailOption);
      return res.status(OK).send({
        error: false,
      });
    } else {
      return res.status(OK).send({
        error: true,
      });
    }
  },

  delete(req, res) {
    const id = req.params.id;
    return query
      .delete(id)
      .then((shop) => res.status(OK).send({ error: false, data: id }))
      .catch((error) =>
        res.status(SERVER_ERROR).send({ message: serverError, error: true })
      );
  },
  contactUs(req, res) {
    try {
      const { message, email, name, reason } = req.body;
      const mailOption = Mail.contactOptions(email, reason, message, name);

      Mail.send(mailOption);
      return res.status(OK).send({ error: false });
    } catch (err) {
      return res.status(OK).send({ error: true });
    }
  },
  findByUser(req, res) {
    const userId = req.params.id;
    return query
      .findOne({ userId })
      .then((shop) => res.status(OK).send({ error: false, data: shop }))
      .catch((error) =>
        res.status(SERVER_ERROR).send({ message: serverError, error: true })
      );
  },

  findShopByName(req, res) {
    const shopName = req.body.shopName.toLowerCase();
    return Shop.findOne({
      where: model.sequelize.where(
        model.sequelize.fn("lower", model.sequelize.col("shopName")),
        model.sequelize.fn("lower", shopName)
      ),
    })
      .then((shop) => {
        res.status(OK).send(shop);
      })
      .catch((error) =>
        res.status(SERVER_ERROR).send({ message: serverError, error: true })
      );
  },

  findShopByUrl(req, res) {
    const shopUrl = req.body.shopUrl.toLowerCase();
    return Shop.findOne({
      where: model.sequelize.where(
        model.sequelize.fn("lower", model.sequelize.col("shopUrl")),
        model.sequelize.fn("lower", shopUrl)
      ),
      include: [{ all: true }],
    })
      .then((shop) => {
        res.status(OK).send(shop);
      })
      .catch((error) =>
        res.status(SERVER_ERROR).send({ message: serverError, error: true })
      );
  },

  findPk(req, res) {
    try {
      const id = req.params.id;
      return query
        .findPK(id)
        .then((shop) => res.status(OK).send({ error: false, data: shop }))
        .catch((error) => {
          console.log(error);
          res.status(SERVER_ERROR).send({ message: serverError, error: true });
        });
    } catch (err) {
      console.log(err);
    }
  },

  update(req, res) {
    const name = req.body.name;
    const id = req.params.id;
    return query
      .update(id, { name: name })
      .then((shop) => res.status(OK).send({ error: false, data: shop }))
      .catch((error) =>
        res.status(SERVER_ERROR).send({ message: serverError, error: true })
      );
  },
  updateSettings(req, res) {
    const {
      deliveryPrice,
      minOrder,
      maxTime,
      minTime,
      percentageDiscount,
      discountAmount,
      notice,
      prepareTime,
    } = req.body;

    const id = req.params.id;
    return query
      .update(id, {
        deliveryPrice,
        minOrder,
        maxTime,
        minTime,
        prepareTime,
        percentageDiscount,
        discountAmount,
        notice,
      })
      .then((shop) =>
        res.status(OK).send({ error: false, data: shop, message: savedSuccess })
      )
      .catch((error) =>
        res.status(SERVER_ERROR).send({ message: serverError, error: true })
      );
  },
  updateBankDetail(req, res) {
    const { bankDetail } = req.body;

    const id = req.params.id;
    return query
      .update(id, {
        bankDetail,
      })
      .then((shop) =>
        res.status(OK).send({ error: false, data: shop, message: savedSuccess })
      )
      .catch((error) =>
        res.status(SERVER_ERROR).send({ message: serverError, error: true })
      );
  },

  findAll(req, res) {
    return query
      .findAll()
      .then((shop) => res.status(OK).send({ error: false, data: shop }))
      .catch((error) =>
        res.status(SERVER_ERROR).send({ message: serverError, error: true })
      );
  },

  findByOrigin(req, res) {
    const { originId } = req.body;

    return Shop.findAll({
      where: { originId },
      include: [
        {
          model: Origin,
          as: "Origin",
          required: true,
        },
        {
          model: Rating,
          as: "ratings",
          required: false,
        },
      ],
    })
      .then((shop) => res.status(OK).send({ error: false, data: shop }))
      .catch((error) =>
        res.status(SERVER_ERROR).send({ message: serverError, error: true })
      );
  },
  shopListing(req, res) {
    return Shop.findAll({
      include: [
        {
          model: Origin,
          as: "Origin",
          required: true,
        },
        {
          model: Rating,
          as: "ratings",
          required: false,
        },
      ],
    }).then((shop) => res.status(OK).send({ error: false, data: shop }));
  },
  shopSearch(req, res) {
    const search = req.body.search.toLowerCase();
    return Shop.findAll({
      where: {
        [Op.or]: [
          model.sequelize.where(
            model.sequelize.fn("lower", model.sequelize.col("shopName")),
            {
              [Op.like]: `%${search}%`,
            }
          ),
          model.sequelize.where(
            model.sequelize.fn("lower", model.sequelize.col("about")),
            {
              [Op.like]: `%${search}%`,
            }
          ),
        ],
      },
      include: [
        {
          model: Origin,
          as: "Origin",
          required: true,
        },
        {
          model: Rating,
          as: "ratings",
          required: false,
        },
      ],
    }).then((shop) => res.status(OK).send({ error: false, data: shop }));
  },
  findDuration(req, res) {
    return res.status(OK).send({ error: false, data: duration });
  },
};
