import 'dotenv/config';
import fastify, { FastifyInstance } from 'fastify';
import app from './app';
import serverConfig from './config/serverConfig';

const serverUp = () => {
	const server: FastifyInstance = fastify({
		logger: true,
	});
	server.register(app);
	void server.listen({
		port: Number(serverConfig.PORT),
		host: serverConfig.HOST,
	});
	void server.ready((err) => {
		if (err) {
			server.log.error(err);
			process.exit(1);
		}
		server.log.info(`server listening on http://${serverConfig.HOST}:${serverConfig.PORT}`);
		server.log.info(
			`Browse your REST API at %s%s http://${serverConfig.HOST}:${serverConfig.PORT}/explorer`,
		);
	});
};
serverUp();
