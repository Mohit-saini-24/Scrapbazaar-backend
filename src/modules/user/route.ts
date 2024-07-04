import type { FastifyPluginAsync } from 'fastify';
import { FromSchema } from 'json-schema-to-ts';

import { loginHandler, registerHandler } from './handler';
import { LoginBody, RegisterBody } from './user.types';

const routeDef = {
	register: {
		url: '/api/user/register',
		schema: {
			body: RegisterBody,
		},
	},
	login: {
		url: '/api/user/login',
		schema: {
			body: LoginBody,
		},
	},
};

const routes: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
	fastify.post<{ Body: FromSchema<typeof RegisterBody> }>(routeDef.register.url, { schema: routeDef.register.schema }, async (request, reply) => {
		const body = {
			username: request.body.username,
			password: request.body.password,
			role: request.body.role,
		};
		return await registerHandler(body);
	});
	fastify.post<{ Body: FromSchema<typeof LoginBody> }>(routeDef.login.url, routeDef.login, async (request, reply) => {
		const body = {
			username: request.body.username,
			password: request.body.password,
		};
		return await loginHandler(body);
	});
};

export default routes;
