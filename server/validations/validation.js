const Joi = require('joi'); 


module.exports = {
  nameSchema : (dataToValidate)=>{
    const schema = Joi.object().keys({ 
      name: Joi.string().min(3).max(80).required()
    });
    return Joi.validate(dataToValidate, schema);
  },
  filter: (message)=>{
    return message.error.details[0].message
  }
};