import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';

import logger from '../../config/logger';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { ServiceError } from '../../config/error';
import serverConfig from '../../config/serverConfig';
import { TokenData } from '../user/user.types';

const routeDef = {
	createOrder: {
		method: 'POST',
		url: '/api/v1/seller/createOrder',
		schema: {},
	},
	updateOrder: {
		method: 'POST',
		url: '/api/v1/seller/updateOrder',
		schema: {},
	},
	getOrder: {
		method: 'GET',
		url: '/api/v1/seller/getOrderById/:orderId',
		schema: {},
	},
	getAllOrders: {
		method: 'GET',
		url: '/api/v1/seller/getAllOrders',
		schema: {},
	},
};
const routes: FastifyPluginAsync = async function (fastify, _opts): Promise<void> {
	fastify.decorateRequest('userdata', async function (this: FastifyRequest): Promise<TokenData> {
		logger.info('decorator');
		logger.debug(this.headers['authorization']);
		const header = (this.headers['authorization'] as string) || '';
		try {
			const data: TokenData = jwt.verify(header, serverConfig.SECRET) as TokenData;
			logger.info(`data ${JSON.stringify(data)}`);
			return data;
		} catch (error) {
			throw new ServiceError(StatusCodes.UNAUTHORIZED, getReasonPhrase(StatusCodes.UNAUTHORIZED));
		}
	});
	fastify.post<{}>(routeDef.createOrder.url, { schema: routeDef.createOrder.schema }, async (request: FastifyRequest, reply: FastifyReply) => {
		const userData = await request.userdata();
		logger.info(userData);
	});
};
export default routes;
