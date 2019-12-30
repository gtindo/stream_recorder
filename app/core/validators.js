const Joi = require('@hapi/joi');

const recordSchema  = Joi.object().keys({
	action: Joi.string().required(),
	link: Joi.string(),
	ext: Joi.string.required(),
	time: Joi.number().required()
})


exports.schemas = {
	recordSchema: recordSchema
};
