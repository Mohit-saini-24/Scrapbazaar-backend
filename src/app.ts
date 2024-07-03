import { FastifyInstance } from 'fastify';
import healthRoute from './modules/health/route';
import registerRoute from './modules/user/route';
import appPlugin from './plugins/app.plugin';

const app = async (fastify: FastifyInstance) => {
	void fastify.register(appPlugin);
	void fastify.register(healthRoute);
	void fastify.register(registerRoute);
};
export default app;
