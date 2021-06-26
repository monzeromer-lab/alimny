const Joi = require("joi");

const updateProfile = Joi.object({
firstName : 
Joi.string()
.required()
.label("First name"),

lastName : 
Joi.string()
.required()
.label("last name"),

birthDate : 
Joi.date()
.required()
.label("birth date")

});

module.exports = {updateProfile};