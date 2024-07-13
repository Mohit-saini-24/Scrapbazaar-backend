export const RegisterBody = {
	type: 'object',
	properties: {
		// email: { type: 'string' },
		// phone: { type: 'string' },
		username: { type: 'string' },
		password: { type: 'string' },
		role: { type: 'string' },
		usernameType: { type: 'string' },
		// isIndustry: { type: 'boolean' },
		// industryDetails: {
		// 	type: 'object',
		// 	properties: {
		// 		companyName: { type: 'string' },
		// 		gstin: { type: 'string' },
		// 	},
		// },
		// address: { type: 'string' },
		// state: { type: 'string' },
		// city: { type: 'string' },
		// pincode: { type: 'number' },
		// phoneVerified: { type: 'boolean' },
	},
	required: ['username', 'password', 'role', 'usernameType'],
} as const;

export const LoginBody = {
	type: 'object',
	properties: {
		username: { type: 'string' },
		password: { type: 'string' },
	},
	required: ['username', 'password'],
} as const;

export const LoginResponse = {
	type: 'object',
	properties: {
		user: {
			type: 'object',
			properties: {
				username: { type: 'string' },
				role: { type: 'string' },
			},
		},
		accessToken: { type: 'string' },
	},
} as const;

export interface TokenData {
	userId: string;
	role: string;
	exp: number;
	iat: number;
}
