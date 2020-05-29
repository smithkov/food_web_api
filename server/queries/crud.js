const { v4: uuidv4 } = require("uuid");
class Query {
  constructor(model) {
    this.model = model;
  }

  add(param) {
    param.id = uuidv4();
    return this.model.create(param);
  }

  findPK(pk) {
    return this.model.findByPk(pk);
  }

  update(id, param) {
    return this.model.update(param, {
      where: {
        id: id,
      },
    });
  }

  findAll() {
    return this.model.findAll();
  }

  delete(pk) {
    return this.model.destroy({
      where: {
        id: pk,
      },
    });
  }
}

module.exports = Query;
