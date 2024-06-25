const Joi = require("joi");

module.exports.addContact = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        phone: Joi.number().required(),
        addedBy: Joi.number().required(),
    }),
};
module.exports.getContacts = {
    body: Joi.object().keys({
        phone: Joi.number().required(),
        userId: Joi.number().required(),
    }),
};
module.exports.addContactToSpam = {
    body: Joi.object().keys({
        phone: Joi.number().required(),
        userId: Joi.number().required(),
    }),
};