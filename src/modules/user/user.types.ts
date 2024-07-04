export const RegisterBody = {
	type: 'object',
	properties: {
		username: { type: 'string' },
		password: { type: 'string' },
		role: { type: 'string' },
		isIndustry: { type: 'boolean' },
		industryDetails: {
			type: 'object',
			properties: {
				companyName: { type: 'string' },
				gstin: { type: 'string' },
				companyAddress: { type: 'string' },
			},
		},
		address: { type: 'string' },
		pincode: { type: 'number' },
		mobileNumberVerified: { type: 'boolean' },
	},
	required: ['username', 'password', 'role'],
} as const;

export const LoginBody = {
	type: 'object',
	properties: {
		username: { type: 'string' },
		password: { type: 'string' },
	},
	required: ['username', 'password'],
} as const;

export const LoginBodyResponse = {
	type: 'object',
	properties: {
		username: { type: 'string' },
		token: { type: 'string' },
		role: { type: 'string' },
		expiry: { type: 'number' },
	},
} as const;
