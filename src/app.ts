import { FastifyInstance } from 'fastify';
import { healthRoute } from './routes/health.route';

const app = async (fastify: FastifyInstance) => {
	void fastify.register(healthRoute);
};
export default app;
