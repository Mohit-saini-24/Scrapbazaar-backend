import 'fastify';

declare module 'fastify' {
	interface FastifyRequest {
		userdata: () => Promise<{ name: string }>;
	}
}
