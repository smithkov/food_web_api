const OpeningDay = require("../models").OpeningDay;
const Query = new require("../queries/crud");
const model = require("../models");
const validate = require("../validations/validation");
const {
  SERVER_ERROR,
  OK,
  VALIDATION_ERROR,
  Messages,
} = require("../errors/statusCode");
const query = new Query(OpeningDay);

module.exports = {
  create: async (req, res) => {
    const {
      sunId,
      monId,
      tueId,
      wedId,
      thurId,
      friId,
      satId,
      shopId,
      sunChecked,
      selectedSunMin,
      selectedSunMax,
      monChecked,
      selectedMonMin,
      selectedMonMax,
      tueChecked,
      selectedTueMin,
      selectedTueMax,
      wedChecked,
      selectedWedMin,
      selectedWedMax,
      thurChecked,
      selectedThurMin,
      selectedThurMax,
      friChecked,
      selectedFriMin,
      selectedFriMax,
      satChecked,
      selectedSatMin,
      selectedSatMax,
    } = req.body;
    try {
      const t = await model.sequelize.transaction();
      const findByShop = await query.findAllWithParam({ shopId });
      const findByShopLength = findByShop.length;
      //console.log("checked-------------", monChecked, satChecked);

      if (findByShopLength == 0) {
        const sun = await query.addTransact(
          {
            opening: selectedSunMin,
            closing: selectedSunMax,
            shopId,
            day: "Sunday",
            checked: sunChecked,
          },
          t
        );
        const mon = await query.addTransact(
          {
            opening: selectedMonMin,
            closing: selectedMonMax,
            shopId,
            day: "Monday",
            checked: monChecked,
          },
          t
        );
        const tue = await query.addTransact(
          {
            opening: selectedTueMin,
            closing: selectedTueMax,
            shopId,
            day: "Tuesday",
            checked: tueChecked,
          },
          t
        );
        const wed = await query.addTransact(
          {
            opening: selectedWedMin,
            closing: selectedWedMax,
            shopId,
            day: "Wednesday",
            checked: wedChecked,
          },
          t
        );
        const thur = await query.addTransact(
          {
            opening: selectedThurMin,
            closing: selectedThurMax,
            shopId,
            day: "Thursday",
            checked: thurChecked,
          },
          t
        );
        const fri = await query.addTransact(
          {
            opening: selectedFriMin,
            closing: selectedFriMax,
            shopId,
            day: "Friday",
            checked: friChecked,
          },
          t
        );
        const sat = await query.addTransact(
          {
            opening: selectedSatMin,
            closing: selectedSatMax,
            shopId,
            day: "Saturday",
            checked: satChecked,
          },
          t
        );
        await t.commit();
        res.status(OK).send({ error: false, message: Messages.savedSuccess });
      } else {
        const sun = await query.updateTransact(
          sunId,
          {
            opening: selectedSunMin,
            closing: selectedSunMax,
            checked: sunChecked,
          },
          t
        );

        const mon = await query.updateTransact(
          monId,
          {
            opening: selectedMonMin,
            closing: selectedMonMax,
            checked: monChecked,
          },
          t
        );

        const tue = await query.updateTransact(
          tueId,
          {
            opening: selectedTueMin,
            closing: selectedTueMax,
            checked: tueChecked,
          },
          t
        );

        const wed = await query.updateTransact(
          wedId,
          {
            opening: selectedWedMin,
            closing: selectedWedMax,
            checked: wedChecked,
          },
          t
        );

        const thur = await query.updateTransact(
          thurId,
          {
            opening: selectedThurMin,
            closing: selectedThurMax,
            checked: thurChecked,
          },
          t
        );

        const fri = await query.updateTransact(
          friId,
          {
            opening: selectedFriMin,
            closing: selectedFriMax,
            checked: friChecked,
          },
          t
        );

        const sat = await query.updateTransact(
          satId,
          {
            opening: selectedSatMin,
            closing: selectedSatMax,
            checked: satChecked,
          },
          t
        );
        await t.commit();
        res.status(OK).send({ error: false, message: Messages.savedSuccess });
      }
    } catch (err) {
      await t.rollback();
      res.status(OK).send({ error: true, message: Messages.serverError });
    }
  },

  findAllByShop(req, res) {
    const shopId = req.body.shopId;
    return query
      .findAllWithParam({ shopId })
      .then((opening) => res.status(OK).send({ error: false, data: opening }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },
};
