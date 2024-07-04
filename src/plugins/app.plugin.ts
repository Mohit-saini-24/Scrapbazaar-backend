import type { FastifyPluginAsync } from 'fastify';
import multipart from '@fastify/multipart';
const plugins: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
	fastify.register(multipart);
};
export default plugins;
