import 'fastify';
import { TokenData } from './src/modules/user/user.types';

declare module 'fastify' {
	interface FastifyRequest {
		userdata: () => Promise<TokenData>;
	}
}
