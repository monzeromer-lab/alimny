const Joi = require("joi");

const registerSchema = Joi.object({

    username:
        Joi.string()
        .max(20)
        .min(8)
        .lowercase()
        .required()
        .alphanum()
        .label("username")

    ,password: 
        Joi.string()
        .alphanum()
        .required()
        .label("password")

    ,firstName: 
        Joi.string()
        .lowercase()
        .max(10)
        .required()
        .label("first name")

    ,lastName: 
        Joi.string()
        .lowercase()
        .max(10)
        .required()
        .label("last name")

    ,email: 
        Joi.string()
        .email()
        .required()
        .label("email")

    ,image:
        Joi.any()
        .meta({swaggerType: "file"})
        .required()
        .label("image")

    ,birthDate :
        Joi.date()
        .required()
        .label("birth date")
});

const loginSchema = Joi.object({

    username:
        Joi.string()
        .max(20)
        .min(8)
        .lowercase()
        .optional()
        .alphanum()
        .label("username")

    ,password: 
        Joi.string()
        .alphanum()
        .required()
        .label("password")

    ,email: 
        Joi.string()
        .email()
        .required()
        .label("email")
});
module.exports = {registerSchema , loginSchema};