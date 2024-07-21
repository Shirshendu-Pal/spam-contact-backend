const Joi = require('joi');

module.exports.addQuestion = {
    body: Joi.object().keys({
        name:Joi.string().required(),
        description:Joi.string().optional().allow(null, ""),
        categories: Joi.array().required()
    })
}
module.exports.allQuestion = {
    body: Joi.object().keys({
        filters: Joi.object().required()
    })
}
module.exports.questionDetails = {
    body: Joi.object().keys({
        questionId: Joi.string().required()
    })
}