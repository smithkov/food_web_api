const Shop = require("../models").VirtualShop;
const bcrypt = require("bcryptjs");
const User = require("../models").User;
const Banner = require("../models").ShopBanner;
const model = require("../models");
const Role = require("../models").Role;
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
const bannerQuery = new Query(Banner);
const fs = require("fs");
const { savedSuccess, serverError } = Messages;
rmSpace = (str) => {
  return str.replace(" ", "");
};
module.exports = {
  create: async (req, res) => {
    const {
      shopName,
      userId,
      firstAddress,
      secondAddress,
      postCode,
      cityId,
      shopUrl,
    } = req.body;

    const t = await model.sequelize.transaction();

    try {
      const logoObject = req.files["logo"];
      const bannerObject = req.files["banner"];

      const user = await userQuery.findPK(userId);
      const hasShop = await query.findOne({ userId: userId });

      const logo = logoObject ? logoObject[0].filename : null;
      const banner = bannerObject ? bannerObject[0].filename : null;

      if (hasShop) {
        const shopUri = shopUrl != "" ? rmSpace(shopUrl) : shopName;

        const updateShop = await query.updateTransact(
          hasShop.id,
          {
            shopName,
            logo: logo ? logo : hasShop.logo,
            userId: user.id,
            firstAddress,
            secondAddress,
            postCode,
            cityId,
            shopUrl: shopUri,
          },
          t
        );
        if (banner) {
          if (hasShop.shopBanners[0]) {
            const updateShop = await bannerQuery.updateTransact(
              hasShop.shopBanners[0].id,
              {
                bannerPath: banner,
              },
              t
            );
          } else {
            const createBanner = await bannerQuery.addTransact(
              {
                shopId: hasShop.id,
                bannerPath: banner,
              },
              t
            );
          }
        }
        await t.commit();
        return res.status(OK).send({
          data: updateShop,
          error: false,
          message: "Saved successfully.",
        });
      }
    } catch (err) {
      await t.rollback();

      res.status(SERVER_ERROR).send({ message: serverError, error: true });
    }
  },
  createShopInfo: async (req, res) => {
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
      await query.update(shop.id, { isActive: true, verificationCode: "" });
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
      const mailOption = Mail.contactOptions(email, reason, message,name);

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
    } = req.body;

    const id = req.params.id;
    return query
      .update(id, {
        deliveryPrice,
        minOrder,
        maxTime,
        minTime,
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

  findAll(req, res) {
    return query
      .findAll()
      .then((shop) => res.status(OK).send({ error: false, data: shop }))
      .catch((error) =>
        res.status(SERVER_ERROR).send({ message: serverError, error: true })
      );
  },
  findDuration(req, res) {
    return res.status(OK).send({ error: false, data: duration });
  },
};
