// import Joi from "joi";
const Joi = require("joi");

const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua"] },
    })
    .required(),
  phone: Joi.number().required(),
});

const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "ua"] },
  }),

  phone: Joi.number(),
});

module.exports = {
  createContactSchema,
  updateContactSchema,
};
