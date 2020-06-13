const { v4: uuidv4 } = require("uuid");
class Query {
  constructor(model) {
    this.model = model;
  }

  add(param) {
    param.id = uuidv4();
    return this.model.create(param);
  }
  addTransact(param, t) {
    param.id = uuidv4();
    return this.model.create(param,{transaction:t});
  }

  findPK(pk) {
    return this.model.findByPk(pk,{include: [{ all: true }]});
  }

  findOne(param) {
    return this.model.findOne({
      where: param,
      include: [{ all: true }],
    });
  }

  update(id, param) {
    return this.model.update(param, {
      where: {
        id: id,
      },
    });
  }
  updateTransact(id, param,t) {
    return this.model.update(param, {
      where: {
        id: id,
      },transaction:t
    });
  }

  findAll() {
    return this.model.findAll({
      include: [{ all: true }],
    });
  }

  findAllWithParam(param) {
    return this.model.findAll({ where: param, include: [{ all: true }] });
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
