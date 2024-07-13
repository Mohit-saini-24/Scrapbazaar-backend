import fp from 'fastify-plugin';
import multipart from '@fastify/multipart';
import cors from '@fastify/cors';
import type { FastifyCorsOptions } from '@fastify/cors';
import type { FastifyMultipartOptions } from '@fastify/multipart';

export default fp<FastifyMultipartOptions | FastifyCorsOptions>(async (fastify, _opts) => {
	await fastify.register(multipart, {
		attachFieldsToBody: true,
	});
	await fastify.register(cors, {
		origin: '*',
		credentials: true,
	});
});
