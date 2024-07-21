const Joi = require("joi");

module.exports.registerUser = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email(),
        phone: Joi.string().required(),
        password: Joi.string().required(),
    })
};

module.exports.loginUser = {
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
};