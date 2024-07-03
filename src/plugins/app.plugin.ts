import fp from 'fastify-plugin';
import multipart from '@fastify/multipart';
import { errorHook, preValidation } from '../config/hooks';
export default fp(async (fastify, _opts) => {
	fastify.register(multipart);
	fastify.addHook('preValidation', preValidation);
	fastify.setErrorHandler(errorHook);
});
