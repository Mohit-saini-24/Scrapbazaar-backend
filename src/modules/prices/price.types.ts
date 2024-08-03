export const PriceQuery = {
	type: 'object',
	properties: {
		category: { type: 'string' },
		date: { type: 'string' },
	},
	required: [''],
} as const;
