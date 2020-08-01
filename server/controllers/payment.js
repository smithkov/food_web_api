const Origin = require("../models").Origin;
const Query = new require("../queries/crud");
const validate = require("../validations/validation");
const { SERVER_ERROR, OK, VALIDATION_ERROR } = require("../errors/statusCode");
const query = new Query(Origin);
const stripe = require("stripe")(
  "pk_test_51HArokCAtyjlhEIMp36IzBHAoMObEl8U4k7XSY9D2btXmb2qAkTo4p5O1DTO8RjNT8RqSh9xas4YVyiUknDxPsa8003xs1iubt"
);
const { v4: uuidv4 } = require("uuid");

module.exports = {
  payment(req, res) {
    const { product, token } = req.body;

    const idempontencykey = uuidv4();
    return stripe.customers
      .create({
        email: token.email,
        source: token.id,
      })
      .then((customer) => {
        stripe.charges.create(
          {
            amount: 20,
            currency: "GBP",
            customer: customer.id,
            recipient_email: token.email,
            description: "product desc",
            shipping:{
              name: token.card.name,
              address:{
                country:token.card.address_country
              }
            }
          },
          { idempontencykey }
        );
      })
      .then((result) => res.status(200).json(result));
  },
  delete(req, res) {
    const id = req.params.id;
    return query
      .delete(id)
      .then((origin) => res.status(OK).send({ error: false, data: id }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  findPk(req, res) {
    const id = req.params.id;
    return query
      .findPK(id)
      .then((origin) => res.status(OK).send({ error: false, data: origin }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  update(req, res) {
    const name = req.body.name;
    const id = req.params.id;
    return query
      .update(id, { name: name })
      .then((origin) => res.status(OK).send({ error: false, data: origin }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  findAll(req, res) {
    return query
      .findAll()
      .then((origin) => res.status(OK).send({ error: false, data: origin }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },
};
