const OpeningDay = require("../models").OpeningDay;
const Query = new require("../queries/crud");
const model = require("../models");
const validate = require("../validations/validation");
const moment = require('moment');
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
    const t = await model.sequelize.transaction();
    
    //try {
      
      const findByShop = await query.findAllWithParam({ shopId });
      const findByShopLength = findByShop.length;
     
      //console.log("checked-------------", monChecked, satChecked);

      if (findByShopLength == 0) {
        const sun = await query.addTransact(
          {
            opening: selectedSunMin,
            closing: selectedSunMax,
            oTime:moment(selectedSunMin).format('LT'),
            cTime:moment(selectedSunMax).format('LT'),
            shopId,
            dayNum: 7,
            day: "Sunday",
            checked: sunChecked,
          },
          t
        );
        const mon = await query.addTransact(
          {
            opening: selectedMonMin,
            closing: selectedMonMax,
            oTime:moment(selectedMonMin).format('LT'),
            cTime:moment(selectedMonMax).format('LT'),
            shopId,
            day: "Monday",
            dayNum: 1,
            checked: monChecked,
          },
          t
        );
        const tue = await query.addTransact(
          {
            opening: selectedTueMin,
            closing: selectedTueMax,
            oTime:moment(selectedTueMin).format('LT'),
            cTime:moment(selectedTueMax).format('LT'),
            shopId,
            day: "Tuesday",
            dayNum: 2,
            checked: tueChecked,
          },
          t
        );
        const wed = await query.addTransact(
          {
            opening: selectedWedMin,
            closing: selectedWedMax,
            oTime:moment(selectedWedMin).format('LT'),
            cTime:moment(selectedWedMax).format('LT'),
            shopId,
            day: "Wednesday",
            dayNum: 3,
            checked: wedChecked,
          },
          t
        );
        const thur = await query.addTransact(
          {
            opening: selectedThurMin,
            closing: selectedThurMax,
            oTime:moment(selectedThurMin).format('LT'),
            cTime:moment(selectedThurMax).format('LT'),
            shopId,
            day: "Thursday",
            dayNum: 4,
            checked: thurChecked,
          },
          t
        );
        const fri = await query.addTransact(
          {
            opening: selectedFriMin,
            closing: selectedFriMax,
            oTime:moment(selectedFriMin).format('LT'),
            cTime:moment(selectedFriMax).format('LT'),
            shopId,
            day: "Friday",
            dayNum: 5,
            checked: friChecked,
          },
          t
        );
        const sat = await query.addTransact(
          {
            opening: selectedSatMin,
            closing: selectedSatMax,
            oTime:moment(selectedSatMin).format('LT'),
            cTime:moment(selectedSatMax).format('LT'),
            shopId,
            day: "Saturday",
            dayNum: 6,
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
            oTime:moment(selectedSunMin).format('LT'),
            cTime:moment(selectedSunMin).format('LT'),
            dayNum: 7,
            checked: sunChecked,
          },
          t
        );

        const mon = await query.updateTransact(
          monId,
          {
            opening: selectedMonMin,
            closing: selectedMonMax,
            oTime:moment(selectedMonMin).format('LT'),
            cTime:moment(selectedMonMax).format('LT'),
            dayNum: 1,
            checked: monChecked,
          },
          t
        );

        const tue = await query.updateTransact(
          tueId,
          {
            opening: selectedTueMin,
            closing: selectedTueMax,
            oTime:moment(selectedTueMin).format('LT'),
            cTime:moment(selectedTueMax).format('LT'),
            dayNum: 2,
            checked: tueChecked,
          },
          t
        );

        const wed = await query.updateTransact(
          wedId,
          {
            opening: selectedWedMin,
            closing: selectedWedMax,
            oTime:moment(selectedWedMin).format('LT'),
            cTime:moment(selectedWedMax).format('LT'),
            dayNum: 3,
            checked: wedChecked,
          },
          t
        );

        const thur = await query.updateTransact(
          thurId,
          {
            opening: selectedThurMin,
            closing: selectedThurMax,
            oTime:moment(selectedThurMin).format('LT'),
            cTime:moment(selectedThurMax).format('LT'),
            dayNum: 4,
            checked: thurChecked,
          },
          t
        );

        const fri = await query.updateTransact(
          friId,
          {
            opening: selectedFriMin,
            closing: selectedFriMax,
            oTime:moment(selectedFriMin).format('LT'),
            cTime:moment(selectedFriMax).format('LT'),
            dayNum: 5,
            checked: friChecked,
          },
          t
        );

        const sat = await query.updateTransact(
          satId,
          {
            opening: selectedSatMin,
            closing: selectedSatMax,
            oTime:moment(selectedSatMin).format('LT'),
            cTime:moment(selectedSatMax).format('LT'),
            dayNum: 6,
            checked: satChecked,
          },
          t
        );
        await t.commit();
        res.status(OK).send({ error: false, message: Messages.savedSuccess });
      }
    // } catch (err) {
    //   await t.rollback();
    //   res.status(OK).send({ error: true, message: Messages.serverError });
    // }
  },

  findAllByShop(req, res) {
    const shopId = req.body.shopId;
    return query
      .findAllWithParam({ shopId })
      .then((opening) => res.status(OK).send({ error: false, data: opening }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },
};
