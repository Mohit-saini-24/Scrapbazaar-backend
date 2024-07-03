import { FastifyRequest } from 'fastify';
import { passwordHash, verifyPassword } from './module';
import { UserModel } from './db.model';
import { ServiceError } from '../../config/error';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

export const registerHandler = async (request: FastifyRequest) => {
	const inputBody: any = request.body;
	const hash = await passwordHash(inputBody?.password);
	const data = new UserModel({
		username: inputBody?.username,
		password: hash,
		role: inputBody?.role,
	});
	return await data.save();
};

export const loginHandler = async (request: FastifyRequest) => {
	const inputBody: any = request.body;
	const data: any = await UserModel.findOne({
		username: inputBody?.username,
	});
	if (await verifyPassword(inputBody?.password, data?.password)) {
		return data;
	}
	throw new ServiceError(StatusCodes.UNAUTHORIZED, getReasonPhrase(StatusCodes.UNAUTHORIZED));
};
