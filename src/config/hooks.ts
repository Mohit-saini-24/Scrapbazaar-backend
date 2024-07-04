import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { validateSchema } from './input.validation';
import { ServiceError } from './error';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { randomUUID } from 'crypto';
import logger from './logger';
import fp from 'fastify-plugin';

const preValidation = async (request: FastifyRequest, _reply: FastifyReply) => {
	try {
		const pathSplit = request?.url?.split('/');
		const joiSchemaName = pathSplit[pathSplit?.length - 1];
		request.log.info(`joi schema name in request, ${joiSchemaName}, ${pathSplit}, ${pathSplit.length}, ${request.url}`);
		const body = request?.body ?? {};
		if (joiSchemaName) await validateSchema(joiSchemaName, body);
	} catch (error) {
		request.log.error(`error in request ${error}`);
		//@ts-ignore
		const errMsgs = error?.details
			?.map((err: any) => {
				return err.message;
			})
			.join(',');
		request.log.error(`error in request ${errMsgs}`);
		throw new ServiceError(StatusCodes.BAD_REQUEST, errMsgs);
	}
};

const errorHook = (error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
	request.log.error(`inside error hook : ${error}`);
	if (error instanceof ServiceError) {
		return reply.code(error?.error?.statusCode).send({ error: error?.error });
	}
	if (error?.statusCode === StatusCodes.BAD_REQUEST) {
		return reply.code(StatusCodes.BAD_REQUEST).send({
			error: {
				statusCode: StatusCodes.BAD_REQUEST,
				message: getReasonPhrase(StatusCodes.BAD_REQUEST),
			},
		});
	}
	return reply.code(StatusCodes.INTERNAL_SERVER_ERROR).send({
		error: {
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
		},
	});
};

const onRequest = async (request: FastifyRequest, _reply: FastifyReply) => {
	request.id = randomUUID();
	logger.info(`uniqueId ${request.id}`);
};

export default fp(async (fastify, _opts) => {
	fastify.addHook('preValidation', preValidation);
	fastify.addHook('onRequest', onRequest);
	fastify.setErrorHandler(errorHook);
});
