import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import logger from '../../config/logger';
import fastifyPlugin from 'fastify-plugin';
const routeDef = {
	listScrap: {
		url: '/api/buyer/list',
		schema: {},
	},
};
const routes: FastifyPluginAsync = async function (fastify, _opts): Promise<void> {
	fastify.decorateRequest('userdata', async function (this: FastifyRequest): Promise<{ name: string }> {
		console.log('decorator');
		console.log(this.headers);
		return {
			name: 'mohit',
		};
	});
	fastify.post<{}>(routeDef.listScrap.url, { schema: routeDef.listScrap.schema }, async (request: FastifyRequest, reply: FastifyReply) => {
		const userData = await request.userdata();
		console.log(userData);
	});
};
export default routes;
