import Joi, { ObjectSchema } from 'joi';

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

const schemaToValidate: Record<string, ObjectSchema<any>> = {
	register: registerSchema,
};
export const validateSchema = async (joiSchemaName: string, body: Object = {}) => {
	if (schemaToValidate[joiSchemaName]) {
		await schemaToValidate[joiSchemaName]?.validateAsync(body, config);
	}
};
