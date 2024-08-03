import { FastifyInstance } from 'fastify';
import hooks from './config/hooks';
import appPlugin from './plugins/app.plugin';

import healthRoute from './modules/health/route';
import registerRoute from './modules/user/route';
import buyerRoutes from './modules/buyer/routes';
import priceRoutes from './modules/prices/route';

const app = async (fastify: FastifyInstance) => {
	void fastify.register(appPlugin);
	void fastify.register(hooks);
	void fastify.register(healthRoute);
	void fastify.register(registerRoute);
	void fastify.register(buyerRoutes);
	void fastify.register(priceRoutes);
};
export default app;
