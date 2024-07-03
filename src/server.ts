import 'dotenv/config';
import fastify, { FastifyInstance } from 'fastify';
import app from './app';
import serverConfig from './config/serverConfig';
import connectMongo from './config/mongodb.connection';

const serverUp = async () => {
	await connectMongo();
	const server: FastifyInstance = fastify({
		logger: true,
	});
	server.register(app);
	void server.listen({
		port: Number(serverConfig.PORT),
		host: '0.0.0.0',
	});
	void server.ready((err) => {
		if (err) {
			server.log.error(err);
			process.exit(1);
		}
		server.log.info(`server config :: ${JSON.stringify(serverConfig)}`);
		server.log.info(`server listening on http://0.0.0.0:${serverConfig.PORT}`);
	});
};
serverUp();
