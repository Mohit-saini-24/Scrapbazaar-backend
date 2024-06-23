import mongoose from 'mongoose';
import { FastifyInstance } from 'fastify';
import serverConfig from '../config/serverConfig';

async function connectMongo(fastify: FastifyInstance) {
	const { set, connection, connect } = mongoose;
	set('debug', true);
	set('strictQuery', false);
	set('toJSON', { useProjection: true });

	connection.on('connected', () => {
		fastify.log.info(`MongoDB is Connected ✅ ${serverConfig.DB_STRING}`);
	});
	connection.on('disconnected', (reason) => {
		fastify.log.error('MongoDB is Disconnected ❌', reason);
	});

	connection.on('error', (reason) => {
		fastify.log.error('MongoDB error emitted ❌', reason);
	});

	connection.on('reconnected', () => {
		fastify.log.debug('Reconnected to MongoDB 🤞');
	});

	try {
		await connect(serverConfig.DB_STRING);
	} catch (error) {
		fastify.log.error('Mongo connect error', error);
		throw error;
	}
}

export default connectMongo;
