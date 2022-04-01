const Joi = require('joi');

const schema = Joi.object({
  productId: Joi.number()
    .integer()
    .required(),
  quantity: Joi.number()
    .integer()
    .min(1)
    .required(),
});

const validate = async (req, res, next) => {
  const [body] = req.body;
  const { productId, quantity } = body;
  const { error } = await schema.validate({ quantity, productId });

  if (!error) return next();

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