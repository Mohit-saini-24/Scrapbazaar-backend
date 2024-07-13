import type { FastifyPluginAsync } from 'fastify';

const routeDef = {
	health: {
		url: '/api/v1/health',
		schema: {},
	},
};

const routes: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
	fastify.get<{}>(routeDef.health.url, { schema: routeDef.health.schema }, async (_request, reply) => {
		reply.send({ status: 'OK' });
	});
};

export default routes;
