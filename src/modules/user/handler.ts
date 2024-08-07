import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { FromSchema } from 'json-schema-to-ts';
import jwt from 'jsonwebtoken';

import { passwordHash, verifyPassword } from './module';
import { UserModel } from './db.model';
import { ServiceError } from '../../config/error';
import { RegisterBody, LoginBody, TokenData } from './user.types';
import logger from '../../config/logger';
import serverConfig from '../../config/serverConfig';

export const registerHandler = async (body: FromSchema<typeof RegisterBody>) => {
	const hash = await passwordHash(body.password);
	const data = new UserModel({
		username: body.username,
		password: hash,
		role: body.role,
		usernameType: body.usernameType,
	});
	try {
		await data.save();
		const loginBody = {
			username: body.username,
			password: body.password,
		};
		return await loginHandler(loginBody);
	} catch (error: any) {
		logger.error(`error ${error}`);
		if (error?.message?.includes('E11000 duplicate key error collection')) {
			throw new ServiceError(StatusCodes.FORBIDDEN, 'Duplicate username');
		} else {
			throw error;
		}
	}
};

export const loginHandler = async (body: FromSchema<typeof LoginBody>) => {
	const data: FromSchema<typeof RegisterBody> | null = await UserModel.findOne({
		username: body.username,
	}).lean();
	if (!data) throw new ServiceError(StatusCodes.BAD_REQUEST, 'Incorrect User Name');
	if (await verifyPassword(body.password, data?.password)) {
		const toEncrypt = {
			userId: data._id,
			role: data.role,
			exp: 31536000,
		};
		const accessToken: string = jwt.sign(toEncrypt, serverConfig.SECRET);
		return {
			accessToken,
			user: {
				username: data.username,
				role: data.role,
			},
		};
	}
	throw new ServiceError(StatusCodes.UNAUTHORIZED, getReasonPhrase(StatusCodes.UNAUTHORIZED));
};
