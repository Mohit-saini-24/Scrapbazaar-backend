import { FastifyPluginAsync } from 'fastify';
import { PriceQuery } from './price.types';
import { FromSchema } from 'json-schema-to-ts';
import { priceQueryHandler } from './handler';

const routeDef = {
	getPrices: {
		url: '/api/v1/scrap/prices',
		schema: {
			query: PriceQuery,
		},
	},
};

const routes: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
	fastify.get<{ Querystring: FromSchema<typeof PriceQuery> }>(routeDef.getPrices.url, {}, async (request, reply) => {
		const query = request.query;
		return await priceQueryHandler(query);
	});
};

export default routes;
