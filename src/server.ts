import 'dotenv/config';
import fastify, { FastifyBaseLogger, FastifyInstance } from 'fastify';
import app from './app';
import serverConfig from './config/serverConfig';
import connectMongo from './config/mongodb.connection';
import logger from './config/logger';

const serverUp = async () => {
	await connectMongo();
	const server: FastifyInstance = fastify({
		logger: logger as unknown as FastifyBaseLogger,
	});
	server.register(app);
	void server.listen({
		port: Number(serverConfig.PORT),
		host: '0.0.0.0',
	});
	void server.ready((err) => {
		if (err) {
			logger.error(err);
			process.exit(1);
		}
		logger.info(`server config :: ${JSON.stringify(serverConfig)}`);
		logger.info(`server listening on http://0.0.0.0:${serverConfig.PORT}`);
	});
};
serverUp();
