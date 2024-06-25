const Joi = require("joi");

module.exports.userDetails = {
    body: Joi.object().keys({
        userId: Joi.string().required(),   
    }),
};
module.exports.addUser = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().optional().allow(null, ''),
        phone: Joi.number().required(),
        password: Joi.string().required(),
    }),
};
module.exports.loginUser = {
    body: Joi.object().keys({
        phone: Joi.number().required(),
        password: Joi.string().required(),
    }),
};