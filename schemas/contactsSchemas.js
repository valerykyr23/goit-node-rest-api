// import Joi from "joi";
const Joi = require("joi")

const createContactSchema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required()
})

 const updateContactSchema = Joi.object({
id: Joi.number().required(),
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required()
})


module.exports = {
    createContactSchema,
    updateContactSchema
}