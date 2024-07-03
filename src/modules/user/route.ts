import { FastifyInstance, FastifyRequest } from 'fastify';
import { loginHandler, registerHandler } from './handler';
import { User } from './register.types';

const routeDef = {
	register: {
		url: '/api/user/register',
		schema: {},
	},
	login: {
		url: '/api/user/login',
		schema: {},
	},
};

export default (fastify: FastifyInstance, {}, done: () => void) => {
	fastify.post<{ Body: User; Headers: {}; Reply: {}; Querystring: {} }>(
		routeDef.register.url,
		routeDef.register,
		registerHandler,
	);
	fastify.post<{ Body: User; Headers: {}; Reply: {}; Querystring: {} }>(
		routeDef.login.url,
		routeDef.login,
		loginHandler,
	);
	done();
};
