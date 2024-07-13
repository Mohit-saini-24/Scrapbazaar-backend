import type { FastifyPluginAsync } from 'fastify';
import { FromSchema } from 'json-schema-to-ts';

import { loginHandler, registerHandler } from './handler';
import { LoginBody, RegisterBody, LoginResponse } from './user.types';

const routeDef = {
	register: {
		url: '/api/v1/user/register',
		schema: {
			body: RegisterBody,
		},
	},
	login: {
		url: '/api/v1/user/login',
		schema: {
			body: LoginBody,
		},
	},
};

const routes: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
	fastify.post<{ Body: FromSchema<typeof RegisterBody>; Reply: FromSchema<typeof LoginResponse> }>(routeDef.register.url, { schema: routeDef.register.schema }, async (request, reply) => {
		const body = {
			username: request.body.username,
			password: request.body.password,
			role: request.body.role,
			usernameType: request.body.usernameType,
		};
		return await registerHandler(body);
	});
	fastify.post<{ Body: FromSchema<typeof LoginBody>; Reply: FromSchema<typeof LoginResponse> }>(routeDef.login.url, routeDef.login, async (request, reply) => {
		console.log('request.body');
		console.log(request.body);
		const body = {
			username: request.body.username,
			password: request.body.password,
		};
		return await loginHandler(body);
	});
};

export default routes;
