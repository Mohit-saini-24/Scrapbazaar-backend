import { FastifyInstance } from 'fastify';
import mongodb from './plugins/mongodb';
import { healthRoute } from './routes/health.route';

const app = async (fastify: FastifyInstance) => {
	// void fastify.register(mongodb);
	void fastify.register(healthRoute);
};
export default app;
