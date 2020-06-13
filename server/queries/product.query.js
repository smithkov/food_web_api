const Product = require("../models").Product;

const { v4: uuidv4 } = require("uuid");

module.exports ={
    add:(param)=> {
        param.id = uuidv4();
        return Product.create(param);
      },
    
      findPK:(pk)=> {
        return Product.findByPk(pk);
      },
    
      findOne:(param)=> {
        return Product.findOne({
          where: param,
          include: [{ all: true }],
        });
      },
    
      update:(id, param)=> {
        return Product.update(param, {
          where: {
            id: id,
          },
        });
      },
    
      findAllB:function() {
        return Product.findAll({
          include: [{ all: true }],
        });
      },
    
      findAll:(param)=> {
        return Product.findAll({ where: param });
      },
    
      delete:(pk)=> {
        return Product.destroy({
          where: {
            id: pk,
          },
        });
      }
}
  



