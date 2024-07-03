import { FastifyRequest } from 'fastify';

export const healthHandler = async (request: FastifyRequest) => {
	return { status: 'OK' };
};
