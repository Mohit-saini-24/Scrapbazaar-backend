import { FastifyInstance } from 'fastify';
import { healthRoute } from './routes/health.route';
import connectMongo from './database/mongodb';

const app = async (fastify: FastifyInstance) => {
	await connectMongo(fastify);
	void fastify.register(healthRoute);
};
export default app;
