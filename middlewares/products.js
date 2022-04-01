const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string()
    .min(5)
    .required(),
  quantity: Joi.number()
    .integer()
    .min(1)
    .required(),
});

const validate = async (_err, req, res, next) => {
  const { name, quantity } = req.body;

  const { error } = await schema.validate({ name, quantity });

  if (!error) next();

  const { type } = error.details[0];

  if (error) {
    if (type.includes('min')) { // typo de erro 422
      return res.status(422).send({ message: error.message });
    }
    return res.status(400).send({ message: error.message });
  }
};

module.exports = {
  validate,
};