import Joi from 'joi';

const registerSchema = Joi.object({
	username: Joi.string().required(),
	password: Joi.string().required(),
	role: Joi.string().uppercase().valid('BUYER', 'SELLER').required(),
	usernameType: Joi.string().valid('EMAIL', 'PHONE').required(),
	mobileNumber: Joi.string(),
	email: Joi.string(),
	scrapCategory: Joi.array(),
	isIndustry: Joi.boolean(),
	industryDetails: {
		companyName: Joi.string(),
		gstin: Joi.string(),
		companyAddress: Joi.string(),
	},
	address: Joi.string(),
	pincode: Joi.string(),
	mobileNumberVerified: Joi.boolean().default(false),
});

const schemaToValidate = {
	register: registerSchema,
};

const config = {
	abortEarly: true,
	allowUnknown: false,
	convert: true,
	errors: {
		wrap: {
			label: '',
		},
	},
};

export const validateSchema = async (joiSchemaName: string, body: Object = {}) => {
	// @ts-ignore
	if (schemaToValidate[joiSchemaName]) {
		// @ts-ignore
		await schemaToValidate[joiSchemaName]?.validateAsync(body, config);
	}
};
