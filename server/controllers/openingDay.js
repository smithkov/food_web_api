const StoreTime = require("../models").StoreTime;
const Query = new require("../queries/crud");
const model = require("../models");
const validate = require("../validations/validation");
const moment = require("moment");
const formatTime = "HH:mm";
const {
  SERVER_ERROR,
  OK,
  VALIDATION_ERROR,
  Messages,
} = require("../errors/statusCode");
const query = new Query(StoreTime);
const negNum = -1;
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

    //try {

    const findByShop = await query.findAllWithParam({ shopId });
    const findByShopLength = findByShop.length;
    

    //console.log("checked-------------", monChecked, satChecked);

    if (findByShopLength == 0) {
      const sun = {
        opening: selectedSunMin,
        closing: selectedSunMax,
        oTime: moment(selectedSunMin).format(formatTime),
        cTime: moment(selectedSunMax).format(formatTime),
        shopId,
        dayNum: 0,
        day: "Sunday",
        checked: sunChecked,
      };
      const mon = {
        opening: selectedMonMin,
        closing: selectedMonMax,
        oTime: moment(selectedMonMin).format(formatTime),
        cTime: moment(selectedMonMax).format(formatTime),
        shopId,
        day: "Monday",
        dayNum: 1,
        checked: monChecked,
      };
      const tue = {
        opening: selectedTueMin,
        closing: selectedTueMax,
        oTime: moment(selectedTueMin).format(formatTime),
        cTime: moment(selectedTueMax).format(formatTime),
        shopId,
        day: "Tuesday",
        dayNum: 2,
        checked: tueChecked,
      };
      const wed = {
        opening: selectedWedMin,
        closing: selectedWedMax,
        oTime: moment(selectedWedMin).format(formatTime),
        cTime: moment(selectedWedMax).format(formatTime),
        shopId,
        day: "Wednesday",
        dayNum: 3,
        checked: wedChecked,
      };
      const thur = {
        opening: selectedThurMin,
        closing: selectedThurMax,
        oTime: moment(selectedThurMin).format(formatTime),
        cTime: moment(selectedThurMax).format(formatTime),
        shopId,
        day: "Thursday",
        dayNum: 4,
        checked: thurChecked,
      };
      const fri = {
        opening: selectedFriMin,
        closing: selectedFriMax,
        oTime: moment(selectedFriMin).format(formatTime),
        cTime: moment(selectedFriMax).format(formatTime),
        shopId,
        day: "Friday",
        dayNum: 5,
        checked: friChecked,
      };
      const sat = {
        opening: selectedSatMin,
        closing: selectedSatMax,
        oTime: moment(selectedSatMin).format(formatTime),
        cTime: moment(selectedSatMax).format(formatTime),
        shopId,
        day: "Saturday",
        dayNum: 6,
        checked: satChecked,
      };
      const storeTime = await query.add({
        Monday: mon,
        Tuesday: tue,
        Wednesday: wed,
        Thursday: thur,
        Friday: fri,
        Saturday: sat,
        Sunday: sun,
        shopId
      });
      res.status(OK).send({ error: false, message: Messages.savedSuccess });
    } else {
      const sun = {
        opening: selectedSunMin,
        closing: selectedSunMax,
        oTime: moment(selectedSunMin).format(formatTime),
        cTime: moment(selectedSunMax).format(formatTime),
        dayNum: sunChecked ? 0 : negNum,
        checked: sunChecked,
      };

      const mon = {
        opening: selectedMonMin,
        closing: selectedMonMax,
        oTime: moment(selectedMonMin).format(formatTime),
        cTime: moment(selectedMonMax).format(formatTime),
        dayNum: monChecked ? 1 : negNum,
        checked: monChecked,
      };

      const tue = {
        opening: selectedTueMin,
        closing: selectedTueMax,
        oTime: moment(selectedTueMin).format(formatTime),
        cTime: moment(selectedTueMax).format(formatTime),
        dayNum: tueChecked ? 2 : negNum,
        checked: tueChecked,
      };

      const wed = {
        opening: selectedWedMin,
        closing: selectedWedMax,
        oTime: moment(selectedWedMin).format(formatTime),
        cTime: moment(selectedWedMax).format(formatTime),
        dayNum: wedChecked ? 3 : negNum,
        checked: wedChecked,
      };

      const thur = {
        opening: selectedThurMin,
        closing: selectedThurMax,
        oTime: moment(selectedThurMin).format(formatTime),
        cTime: moment(selectedThurMax).format(formatTime),

        dayNum: thurChecked ? 4 : negNum,
        checked: thurChecked,
      };

      const fri = {
        opening: selectedFriMin,
        closing: selectedFriMax,
        oTime: moment(selectedFriMin).format(formatTime),
        cTime: moment(selectedFriMax).format(formatTime),
        dayNum: friChecked ? 5 : negNum,
        checked: friChecked,
      };

      const sat = {
        opening: selectedSatMin,
        closing: selectedSatMax,
        oTime: moment(selectedSatMin).format(formatTime),
        cTime: moment(selectedSatMax).format(formatTime),
        dayNum: satChecked ? 6 : negNum,
        checked: satChecked,
      };
      const update = await query.update(findByShop[0].id, {
        Monday: mon,
        Tuesday: tue,
        Wednesday: wed,
        Thursday: thur,
        Friday: fri,
        Saturday: sat,
        Sunday: sun,
        shopId
      });
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
      .then((opening) => res.status(OK).send({ error: false, data: opening }));
  },
};
