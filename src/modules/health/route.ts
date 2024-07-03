import { FastifyInstance, FastifyRequest } from 'fastify';
import { healthHandler } from './handler';

const routeDef = {
	health: {
		url: '/api/health',
		schema: {},
	},
};

export default (fastify: FastifyInstance, {}, done: () => void) => {
	fastify.get<{}>(routeDef.health.url, routeDef.health, healthHandler);
	done();
};
