import { FastifyInstance, FastifyRequest } from 'fastify';
import routeConfig from '../config/route.config';

const healthHandler = async (request: FastifyRequest) => {
	return { status: 'OK' };
};

export const healthRoute = (fastify: FastifyInstance, {}, done: () => void) => {
	fastify.get<{}>(routeConfig.health.url, routeConfig.health, healthHandler);
	done();
};
