import mongoose from 'mongoose';
import serverConfig from './serverConfig';

async function connectMongo() {
	const { set, connection, connect } = mongoose;
	set('debug', true);
	set('strictQuery', false);
	set('toJSON', { useProjection: true });

	connection.on('connected', () => {
		console.log(`MongoDB is Connected ✅ ${serverConfig.DB_STRING}`);
	});
	connection.on('disconnected', (reason) => {
		console.log('MongoDB is Disconnected ❌', reason);
	});

	connection.on('error', (reason) => {
		console.error('MongoDB error emitted ❌', reason);
	});

	connection.on('reconnected', () => {
		console.log('Reconnected to MongoDB 🤞');
	});

	try {
		// @ts-ignore
		await connect(serverConfig?.DB_STRING);
	} catch (error) {
		console.error('Mongo connect error', error);
		throw error;
	}
}

export default connectMongo;
