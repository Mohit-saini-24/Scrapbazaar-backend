import { FastifyInstance } from 'fastify';
import healthRoute from './modules/health/route';
import registerRoute from './modules/user/route';
import appPlugin from './plugins/app.plugin';
import hooks from './config/hooks';
import buyerRoutes from './modules/buyer/routes';
const app = async (fastify: FastifyInstance) => {
	void fastify.register(appPlugin);
	void fastify.register(hooks);
	void fastify.register(healthRoute);
	void fastify.register(registerRoute);
	void fastify.register(buyerRoutes);
};
export default app;
